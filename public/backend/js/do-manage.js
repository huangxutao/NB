;(function(doc, win) {

  /**
   * 构造编辑器
   */
  function Editor(configuration) {
    var self = this;

    this.editing_area  = configuration.editing_area;
    this.preview_area  = configuration.preview_area;
    this.remote_server = configuration.remote_server || '';
    this.url           = configuration.url;
    this.CodeMirror = CodeMirror(this.editing_area, {
      tabSize: 2,
      autofocus: true,
      styleActiveLine: true,
      lineWrapping: true
    });

    if(configuration.auto_marked) {
      this.editing_area.addEventListener('keyup', function(event) {
        self.preview_area.innerHTML = marked(self.getValue());
      }, false);
    }

    if(configuration.sync_scroll) {
      var CodeMirror_vscrollbar = doc.querySelector('.CodeMirror-vscrollbar');

      CodeMirror_vscrollbar.addEventListener('scroll', function(e) {
        e.stopPropagation();
        self.preview_area.scrollTop = this.scrollTop;
      }, false);
    }


    win.addEventListener('beforeunload', function(e) {
      var confirmationMessage = "\o/";

      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }, false);
  }

  /***
   * 与服务器通信
   * @param  { Object } connection 连接信息
   */
  Editor.prototype.connectServer = function(connection) {
    //  connection.type     请求类型 ( 一般为 POST )
    //  connection.url      请求地址
    //  connection.data     请求的数据 ( 可以为空 )
    //  connection.success  请求完成后的回调函数
    //  connection.fail     请求失败后的回调 ( 可以不填 )

    var request, success, fail;

		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else {
			request = new ActiveXObiect('Microsoft.XMLHTTP');
		}

    request.open(connection.type, connection.url, true);

		success = connection.success;
		fail = connection.fail || function() {};

		request.onreadystatechange = function() {
			if(request.readyState === 4 && request.status === 200) {
        success(request);
			} else {
        fail();
			}
		};

		if(connection.type === 'POST' && connection.data) {
			request.setRequestHeader('Content-type', 'application/json');
			request.send(JSON.stringify(connection.data));
		} else {
			request.send(null);
		}
  };

  /***
   * 批量获取服务器的文章
   * @param  { Number } num 数量
   * @param { Function } 获取成功后的回调
   */
  Editor.prototype.getPosts = function(num, cb) {
    this.num = num || 1;
    this.connectServer({
      type: 'POST',
      url: this.url.get_posts,
      data: {
        num: num
      },
      success: cb
    });
  };

  /**
   * 往编辑器中插入数据 & markdown 解析
   * @param { String } value 插入的字符串
   */
  Editor.prototype.setValue = function(value) {
    this.CodeMirror.setValue(value);
    this.markedPost();
  };

  /**
   * 获取编辑器中的数据
   * @param 返回类型为字符串
   */
  Editor.prototype.getValue = function() {
    return this.CodeMirror.getValue();
  };

  /**
   * 清除所有内容
   */
  Editor.prototype.newPost = function() {
    if(this.getValue() !== '') {
      var isConfirm = confirm('未保存的文章\n\n确认清空当前内容\n');
      if(isConfirm) {
        this.setValue('');
        this.preview_area.innerHTML = '';
      }
    }
  };

  /**
   * 发布文章
   * @param { Function } 发布成功后的回调
   */
  Editor.prototype.publishPost = function(cb) {
    var editor = this;
    var title = doc.querySelector('.preview-content h1');
    var post_title = doc.querySelector('#post-title');
    var post_tag = doc.querySelector('#post-tag');
    var post_category = doc.querySelector('#post-category');

    if(title) {
      post_title.value = title.innerText;
    }

    var post = {
      title: post_title.value,
      content: editor.getValue(),
      tags: post_tag.value,
      category: post_category.value,
      isDraft: false
    };

    console.log(post);

    this.connectServer({
      type: 'POST',
      url: this.url.publish,
      data: post,
      success: cb
    });

  };

  /**
   * 保存为草稿
   * @param { Function } 保存成功后的回调
   */
  Editor.prototype.saveDraft = function(cb) {
    var editor = this;
    var title = doc.querySelector('.preview-content h1');
    var post_title = doc.querySelector('#post-title');
    var post_tag = doc.querySelector('#post-tag');
    var post_category = doc.querySelector('#post-category');

    if(title) {
      post_title.value = title.innerText;
    }

    var post = {
      title: post_title.value,
      content: editor.getValue(),
      tags: post_tag.value,
      category: post_category.value,
      isDraft: true
    };

    this.connectServer({
      type: 'POST',
      url: this.url.draft,
      data: post,
      success: cb
    });
  };

  /**
   * 更新文章
   * @param { Function } 更新成功后的回调
   */
  Editor.prototype.updatePost = function(cb) {
    var editor = this;
    var post_title = doc.querySelector('#post-title');
    var post_tag = doc.querySelector('#post-tag');
    var post_category = doc.querySelector('#post-category');

    var post = {
      title: post_title.value,
      content: editor.getValue(),
      tags: post_tag.value,
      category: post_category.value,
      isDraft: false
    };

    this.connectServer({
      type: 'POST',
      url: this.url.update,
      data: post,
      success: cb
    });
  };

  /**
   * 解析 markdown 文章
   */
  Editor.prototype.markedPost = function() {
    this.preview_area.innerHTML = marked(this.getValue());
  };

  /**
   * new 一个 editor
   */
  var myEditor = new Editor({
    editing_area : doc.querySelector('.markdown-content'),
    preview_area : doc.querySelector('.preview-content'),
    auto_marked: true,
    sync_scroll: true,
    url: {
      publish: '/to-publish',
      edite: '/to-edite',
      delete: '/to-delete',
      draft: '/to-save-draft',
      get_posts: '/get-posts'
    }
  });

  /**
   * 按钮组件
   */
  var Button = {
    // 清除输入框的 value
    clearData: function() {
      var input = doc.querySelectorAll('.modal input');
      var confirm = doc.querySelector('.confirm');

      confirm.innerHTML = '确认';

      setTimeout(function() {
        for(var i = 0, len = input.length; i < len; i++) {
          input[i].value = '';
        }
      }, 1000);
    },

    // 确认提交
    confirm: function(cb) {
      var confirm = doc.querySelector('.confirm');

      confirm.addEventListener('click', function() {
        this.innerHTML = '确认 <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>';
        cb();
      }, false);
    },

    // 取消提交
    cancle: function() {
      var cancle = doc.querySelector('.cancle');

      cancle.addEventListener('click', function() {
        Button.clearData();
        Modal.hide();
      }, false);
    }
  };

  /***
   * 弹出层
   */
  var Modal = {
    modal: doc.querySelector('.modal'),
    modal_content: doc.querySelector('.modal-content'),

    //显示弹出层
    show: function() {
      tools.addClass(Modal.modal, 'show-modal');
    },

    // 隐藏弹出层
    hide: function() {
      tools.removeClass(Modal.modal, 'show-modal');
      Button.clearData();
    },

    // 初始化弹出层
    init: function() {
      var self = this;

      self.show();

      function stopBubble(e) {
        e.stopPropagation();  //停止冒泡
      }

      function unbindHandler() {
        self.modal.removeEventListener('click', self.hide, false);
        self.modal_content.removeEventListener('click', stopBubble, false);
      }

      function bindHandler() {
        self.modal.addEventListener('click', self.hide, false);
        self.modal_content.addEventListener('click', stopBubble, false);
      }

      unbindHandler();
      bindHandler();
    }
  };

  /***
   * 侧栏
   */
  var SideBar = {
    slider: doc.querySelector('.sidebar-slider'),
    content: doc.querySelector('.sidebar'),
    besides: doc.querySelector('.contents'),

    // 显示侧栏
    show: function() {
      tools.addClass(SideBar.besides, 'pushable');
    },

    // 隐藏侧栏
    hide: function() {
      tools.removeClass(SideBar.besides, 'pushable');
    },

    // 移除节点 (文章列表)
    removeNode: function(e) {
      var childNode = e.target.parentNode;
      var parentNode = e.target.parentNode.parentNode;
      parentNode.removeChild(childNode);
    },

    // 添加节点 (文章列表)
    addNode: function(value) {
      var posts = doc.querySelector('.tab-pages');
      var str = value;
      var p = doc.createElement('p');

      p.innerHTML = str;
      posts.appendChild(p);
    },

    // 初始化
    init: function() {
      var posts = doc.querySelector('.tab-pages');

      doc.addEventListener('click', function(e) {
        if(e.target.className === 'sidebar-slider' || e.target.className === 'fa fa-book') {
          SideBar.show();
        } else{
          SideBar.hide();
        }
      }, false);

      SideBar.content.addEventListener('click', function(e) {
        e.stopPropagation();
        if(e.target.tagName === 'I' && /remove/.test(e.target.className )) {
          if(confirm('确认删除该文章？\n\n警告，骚年三思而后行！\n\n！！！！！！该操作不可逆！！！！！！！\n')) {
            SideBar.removeNode(e);
          }
        }
      }, false);

      // 获取文章列表
      posts.addEventListener('scroll', function() {
        var scrollTop = posts.scrollTop;
        var scrollHeight = posts.scrollHeight;
        var clientHeight = posts.clientHeight;
        var page = this.children.length;

        scrollTop = posts.scrollTop;
        scrollHeight = posts.scrollHeight;
        clientHeight = posts.clientHeight;

        if(scrollTop === (scrollHeight - clientHeight)) {
          console.log(0);
        }

      }, false);
    }
  };

  /***
   * 工具栏
   */
  var ToolBar = {
    toolbar: doc.querySelector('.toolbar'),

    newPost: myEditor.newPost.bind(myEditor),

    // 显示提示信息
    displayStatusMsg: function(type, msg) {
      var text = doc.querySelector('.status-msg');

      if(type === 'success') {
        text.children[0].innerHTML = '<i class="fa fa-check-square-o"></i> ' + msg;
        tools.addClass(text, ' ok');
      } else {
        text.children[0].innerHTML = '<i class="fa fa-exclamation-triangle"></i> ' + msg;
        tools.addClass(text, ' error');
      }

      tools.removeClass(text, 'hide-status-msg');

      setTimeout(function() {
        tools.addClass(text, 'hide-status-msg');
        tools.removeClass(text, ' ok');
        tools.removeClass(text, ' error');
      }, 3000);
    },

    // 弹窗控制
    displayModal: function(num) {
      var items = doc.querySelectorAll('.modal .item');

      for(var i = 0, len = items.length; i < len; i++) {
        tools.addClass(items[i], 'hide');
      }
      tools.toggleClass(items[num], 'hide');
    },

    // 发布文章
    publishPost: function() {
      var wrapper_header = doc.querySelector('.wrapper-header');
      var title = doc.querySelector('.preview-content h1');
      var post_title = doc.querySelector('#post-title');

      if(title) {
        post_title.value = title.innerText;
      }

      wrapper_header.innerHTML = '<i class="fa fa-paper-plane"></i> 发布文章';
      this.displayModal(0);
      Button.confirm(function() {
        myEditor.publishPost(function(request) {
          var res = JSON.parse(request.responseText);
          Modal.hide();
          ToolBar.displayStatusMsg(res.status, res.detail);
        });
      });
      Button.cancle();
    },

    // 保存为草稿
    saveDraft: function() {
      var wrapper_header = doc.querySelector('.wrapper-header');
      var title = doc.querySelector('.preview-content h1');
      var post_title = doc.querySelector('#post-title');

      if(title) {
        post_title.value = title.innerText;
      }

      wrapper_header.innerHTML = '<i class="fa fa-coffee"></i> 保存为草稿';
      this.displayModal(0);
      Button.confirm(function() {
        myEditor.saveDraft(function(request) {
          var res = JSON.parse(request.responseText);
          ToolBar.displayStatusMsg(res.status, res.detail);
        });
      });
      Button.cancle();
    },

    // 更新文章
    updatePost: function() {
      var wrapper_header = doc.querySelector('.wrapper-header');

      wrapper_header.innerHTML = '<i class="fa fa-refresh"></i> 更新文章';
      this.displayModal(0);

    },

    // 预览文章 (主要针对小屏幕)
    previewPost: function() {},

    // 插入表情
    insertExpression: function() {
      this.displayModal(1);
    },

    // 设置
    doSetting: function() {
      this.displayModal(2);
    },

    // 初始化
    init: function() {
      this.toolbar.addEventListener('click', function(e) {
        var self = this;
        var items = doc.querySelectorAll('.item');

        if(/tab-btn/.test(e.target.className)) {
          for(var i = 0, len = items.length; i < len; i++) {
            tools.addClass(items[i], 'hide');
          }
          Modal.init();
        }

        switch (e.target.id) {
          case 'new-post':
            ToolBar.newPost();
            break;

          case 'publish-post':
            ToolBar.publishPost();
            break;

          case 'save-draft':
            ToolBar.saveDraft();
            break;

          case 'update-post':
            ToolBar.updatePost();
            break;

          case 'preview-post':
            ToolBar.previewPost();
            break;

          case 'insert-expression':
            ToolBar.insertExpression();
            break;

          case 'setting':
            ToolBar.doSetting();
            break;
        }
      }, false);
    }
  };

  // 初始化后台
  function setUp() {
    SideBar.init();
    ToolBar.init();
  }

  setUp();

}(document, window));
