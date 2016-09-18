;(function(doc, win) {

  /*****************************************************
   * 构造编辑器
   *****************************************************/
  function Editor(configuration) {
    var self = this;

    this.editing_area  = configuration.editing_area;
    this.preview_area  = configuration.preview_area;
    this.remote_server = configuration.remote_server || '';
    this.url           = configuration.url;
    this.placeholder   = configuration.placeholder || '';
    this.CodeMirror = CodeMirror(this.editing_area, {
      tabSize: 2,
      autofocus: true,
      styleActiveLine: true,
      lineWrapping: true
    });

    this.setValue(this.placeholder);

    if(configuration.auto_marked) {
      var value = '';

      this.editing_area.addEventListener('keyup', function(event) {
        if(value !== self.getValue()) {
          self.preview_area.innerHTML = marked(self.getValue());
        }
        value = self.getValue();
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
      url: editor.url.publish,
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
    var post_title = doc.querySelector('#post-title');
    var post_tag = doc.querySelector('#post-tag');
    var post_category = doc.querySelector('#post-category');

    var post = {
      title: post_title.value,
      content: editor.getValue(),
      tags: post_tag.value,
      category: post_category.value,
      isDraft: true
    };

    this.connectServer({
      type: 'POST',
      url: editor.url.draft,
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
    placeholder: '# Welcome To Use NB',
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
      var fn = function() {
        this.innerHTML = '确认 <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>';
        cb();
        confirm.removeEventListener('click', fn, false);
      };

      confirm.addEventListener('click', fn, false);
    },

    // 取消提交
    cancle: function() {
      var cancle = doc.querySelector('.cancle');
      var fn = function() {
        Button.clearData();
        NB.Modal.hide();
        cancle.removeEventListener('click', fn, false);
      };

      cancle.addEventListener('click', fn, false);
    }
  };



  /*****************************************************
   * NB 后台管理
   *****************************************************/
  var NB = {

    /***
     * 内容区
     */
    Contents: {
      edite: doc.querySelector('.markdown-content'),
      preview: doc.querySelector('.preview-content')
    },

    /***
     * 工具栏
     */
    ToolBar: {
      toolbar: doc.querySelector('.toolbar'),
      menus: {
        new: doc.querySelector('#new-post'),
        publish: doc.querySelector('#publish-post'),
        save: doc.querySelector('#save-draft'),
        update: doc.querySelector('#update-post'),
        preview: doc.querySelector('#preview-post'),
        expression: doc.querySelector('#insert-expression'),
        setting: doc.querySelector('#setting')
      },

      displayMenu: function() {

        // 有文字时 显示新建 menu (初始化时)
        if(myEditor.getValue() !== '') {
          tools.removeClass(NB.ToolBar.menus.new, 'hide');
        }

        // 编辑区全屏时 显示预览 menu
        if(tools.hasClass(NB.Contents.edite, 'full-content')) {
          tools.removeClass(NB.ToolBar.menus.preview, 'hide');
        }

        // 有文字时 显示新建 menu (实时)
        NB.Contents.edite.addEventListener('keyup', function() {
          if(myEditor.getValue() !== '') {
            tools.removeClass(NB.ToolBar.menus.new, 'hide');
          } else {
            tools.addClass(NB.ToolBar.menus.new, 'hide');
          }
        }, false);

      },

      // 新建文章
      newPost: function() {
        myEditor.newPost.bind(myEditor);
      },

      // 显示提示信息
      displayStatusMsg: function(type, msg) {
        var text = doc.querySelector('.status-msg');

        tools.removeClass(text, 'hide');

        if(type === 'success') {
          text.children[0].innerHTML = '<i class="fa fa-check-square-o"></i> ' + msg;
          tools.addClass(text, 'ok');
        } else {
          text.children[0].innerHTML = '<i class="fa fa-exclamation-triangle"></i> ' + msg;
          tools.addClass(text, 'error');
        }

        tools.removeClass(text, 'hide-status-msg');

        setTimeout(function() {
          tools.addClass(text, 'hide-status-msg');
        }, 3000);

        setTimeout(function() {
          tools.removeClass(text, 'ok');
          tools.removeClass(text, 'error');
          tools.addClass(text, 'hide');
        },4000);
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
          console.log('hehe');
          myEditor.publishPost(function(request) {
            var res = JSON.parse(request.responseText);
            NB.Modal.hide();
            NB.ToolBar.displayStatusMsg(res.status, res.detail);
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
            NB.Modal.hide();
            NB.ToolBar.displayStatusMsg(res.status, res.detail);
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
        this.displayMenu();

        var fn = function(e) {
          var self = this;
          var items = doc.querySelectorAll('.item');

          if(/tab-btn/.test(e.target.className)) {
            for(var i = 0, len = items.length; i < len; i++) {
              tools.addClass(items[i], 'hide');
            }
            NB.Modal.init();
          }

          switch (e.target.id) {
            case 'new-post':
              NB.ToolBar.newPost();
              break;

            case 'publish-post':
              NB.ToolBar.publishPost();
              break;

            case 'save-draft':
              NB.ToolBar.saveDraft();
              break;

            case 'update-post':
              NB.ToolBar.updatePost();
              break;

            case 'preview-post':
              NB.ToolBar.previewPost();
              break;

            case 'insert-expression':
              NB.ToolBar.insertExpression();
              break;

            case 'setting':
              NB.ToolBar.doSetting();
              break;
          }
        };

        NB.ToolBar.toolbar.addEventListener('click', fn, false);
      }
    },

    /***
     * 弹出层
     */
    Modal: {
      modal_wrapper: doc.querySelector('.modal'),
      modal_content: doc.querySelector('.modal-content'),

      //显示弹出层
      show: function() {
        tools.addClass(NB.Modal.modal_wrapper, 'show-modal');
      },

      // 隐藏弹出层
      hide: function() {
        tools.removeClass(NB.Modal.modal_wrapper, 'show-modal');
        Button.clearData();
      },

      // 初始化弹出层
      init: function() {
        NB.Modal.show();

        function stopBubble(e) {
          e.stopPropagation();  //停止冒泡
        }

        function unbindHandler() {
          NB.Modal.modal_wrapper.removeEventListener('click', NB.Modal.hide, false);
          NB.Modal.modal_content.removeEventListener('click', stopBubble, false);
        }

        function bindHandler() {
          NB.Modal.modal_wrapper.addEventListener('click', NB.Modal.hide, false);
          NB.Modal.modal_content.addEventListener('click', stopBubble, false);
        }

        unbindHandler();
        bindHandler();
      }
    },

    /***
     * 侧栏
     */
    SideBar: {
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
    },

    setUp: function() {
      // this.SideBar.init();
      this.ToolBar.init();
    },

  };

  // 初始化后台
  NB.setUp();

}(document, window));
