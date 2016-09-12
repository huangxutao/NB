;(function(doc, win) {

  function Editor(configuration) {
    var self = this;

    this.editing_area  = configuration.editing_area;
    this.preview_area  = configuration.preview_area;
    this.remote_server = configuration.remote_server || '';
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
  }

  Editor.prototype.connectServer = function(connection) {
    // 与服务器通信
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

  Editor.prototype.getPosts = function(num) {
    //  批量获取服务器的文章
  };

  Editor.prototype.setValue = function(value) {
    //  插入值
    return this.CodeMirror.setValue(value);
  };

  Editor.prototype.getValue = function() {
    //  获取值
    return this.CodeMirror.getValue();
  };

  Editor.prototype.newPost = function() {
    //  清除所有内容
    if(this.getValue() !== '') {
      var isConfirm = confirm('未保存的文章\n\n确认清空当前内容\n');
      if(isConfirm) {
        this.setValue('');
        this.preview_area.innerHTML = '';
      }
    }
  };

  Editor.prototype.publishPost = function() {
    //  发布文章
    var title = doc.querySelector('.preview-content h1');
    var post_title = doc.querySelector('#post-title');

    if(title) {
      post_title.value = title.innerText;
    }

  };

  Editor.prototype.saveDraft = function() {
    //  保存为草稿
  };

  Editor.prototype.updatePost = function() {
    //  更新文章
  };

  Editor.prototype.markedPost = function() {
    // 解析 markdown 文章
    this.preview_area.innerHTML = marked(this.getValue());
  };

  Editor.prototype.statusMsg = function() {};

  var myEditor = new Editor({
    editing_area : doc.querySelector('.markdown-content'),
    preview_area : doc.querySelector('.preview-content'),
    auto_marked: true,
    url: {
      publish: '/to-publish',
      edite: '/to-edite',
      delete: '/to-delete',
      draft: '/save-draft',
    }
  });

  var a = doc.querySelector('.status-msg');
  // a.innerText = 123;
  setTimeout(function() {
    tools.transition(doc.querySelector('.status-msg'), 'slide-up', 600);
  }, 2000);

  /***
   * 弹出层
   */
  function Modal0() {

  }

  var Modal = {
    modal: doc.querySelector('.modal'),
    modal_content: doc.querySelector('.modal-content'),
    show: function() {
      tools.addClass(Modal.modal, 'show-modal');
    },
    hide: function() {
      tools.removeClass(Modal.modal, 'show-modal');
    },
    init: function() {
      var self = this;

      self.show();

      function stopBubble(e) {
        if(e.target.tagName === 'BUTTON') {
          return true;
        } else {
          e.stopPropagation();  //停止冒泡
        }
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

    show: function() {
      tools.addClass(SideBar.besides, 'pushable');
    },

    hide: function() {
      tools.removeClass(SideBar.besides, 'pushable');
    },

    init: function() {
      doc.addEventListener('click', function(e) {
        if(e.target.className === 'sidebar-slider' || e.target.className === 'fa fa-book') {
          SideBar.show();
        } else{
          SideBar.hide();
        }
      }, false);
      SideBar.content.addEventListener('click', function(e) {
        e.stopPropagation();
      }, false);
    }
  };

  SideBar.init();

  /***
   * 工具栏
   */
  var ToolBar = {
    toolbar: doc.querySelector('.toolbar'),

    init: function() {
      this.toolbar.addEventListener('click', function(e) {

        if(/tab-btn/.test(e.target.className)) {
          Modal.init();
          var tab_pages = doc.querySelectorAll('.item');
          var tab_btns = doc.querySelectorAll('.toolbar .tab-btn');

          for(var i = 0, len = tab_btns.length; i < len; i++) {
            tab_btns[i].index = i;
            tools.addClass(tab_pages[i], 'hide');
          }

          tools.removeClass(tab_pages[e.target.index], 'hide');
        } else {
          // return;
        }

        switch (e.target.id) {
          case 'new-post':
            myEditor.newPost();
            break;
          case 'update-post':
            myEditor.updatePost();
            break;
          case 'save-draft':
            myEditor.saveDraft();
            break;
          case 'publish-post':
            myEditor.publishPost();
            break;
          // case 'insert-expression':
            // myEditor.insertExpression();
            // break;
          case 'preview-post':
            // myEditor.previewPost();
            break;
          case 'setting':
            // myEditor.doSetting();
            break;
          default:
            return;
        }
      }, false);
    }
  };


  // var Editor = {
  //   markdown_content: doc.querySelector('.markdown-content'),
  //   preview_content: doc.querySelector('.preview-content'),
  //
  //   setEditor: function() {
  //     return CodeMirror(this.markdown_content, {
  //       tabSize: 2,
  //       autofocus: true,
  //       styleActiveLine: true,
  //       lineWrapping: true
  //     });
  //   },
  //
  //   init: function() {
  //     this.setEditor();
  //     var CodeMirror_vscrollbar = doc.querySelector('.CodeMirror-vscrollbar');
  //
  //
  //
  //     // tools.ajax({
  //     //   type: 'POST',
  //     //   url: '/getOne',
  //     //   data: {
  //     //     id: '57d2563e3792c199532f034b'
  //     //   },
  //     //   success: function(request) {
  //     //     var res = JSON.parse(request.responseText);
  //     //     if(res.result === 'success') {
  //     //       console.log(res.post.content.markdown);
  //     //       myCodeMirror.setValue(res.post.content.markdown);
  //     //     } else {
  //     //       console.log('error');
  //     //     }
  //     //   }
  //     // });
  //
  //     this.markdown_content.addEventListener('keyup', function() {
  //       Editor.preview_content.innerHTML = marked(myCodeMirror.getValue());
  //     }, false);
  //
  //     CodeMirror_vscrollbar.addEventListener('scroll', function(e) {
  //       e.stopPropagation();
  //       Editor.preview_content.scrollTop = this.scrollTop;
  //     }, false);
  //   }
  // };
  //
  // Editor.init();

  ToolBar.init();
}(document, window));
