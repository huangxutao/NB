;(function(doc, win) {
  var load_disqus = doc.getElementById('load-disqus');

  var Disqus = {
    load : function disqus(){
      var disqus_shortname = 'hxtao';

      if(typeof DISQUS !== 'object') {
        (function () {
          var s = doc.createElement('script');
          s.async = true;
          s.type = 'text/javascript';
          s.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          (doc.getElementsByTagName('HEAD')[0] || doc.getElementsByTagName('BODY')[0]).appendChild(s);
          }());
        load_disqus.style.display = 'none';
      }
    }
  };

  var Blog = {
    beforeScrollTop: doc.body.scrollTop || doc.documentElement.scrollTop,

    _getStyle: function (obj, attr) {
      return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
    },

    _ajax: function(args) {
  		var request;
  		var callback0, callback1;

  		if(window.XMLHttpRequest) {
  			request = new XMLHttpRequest();
  		} else {
  			request = new ActiveXObiect('Microsoft.XMLHTTP');
  		}

      request.open(args.type, args.url, true);

  		callback0 = args.success;
  		callback1 = args.fail;
  		request.onreadystatechange = function() {
  			if(request.readyState === 4 && request.status === 200) {
  				callback0(request);
  			} else {
  				if(callback1) callback1();
  			}
  		};

  		if(args.type === 'POST') {
  			request.setRequestHeader('Content-type', 'application/json');
  			request.send(JSON.stringify(args.data));
  		} else {
  			request.send(null);
  		}
  	},

    toTop: function() {
      var toTop = doc.getElementById('to-top');

      if(toTop)
      toTop.addEventListener('click', function() {
        window.scrollTo(0, 0);
      }, false);
    },

    highLight: function() {
      hljs.initHighlightingOnLoad();
    },

    toggleFixPostHeader: function() {
      var post_header = doc.querySelector('.post .header');
      var post_msg = doc.querySelector('.post .msg');

      if(post_header)
      win.addEventListener('scroll', function() {
        var afterScrollTop = doc.body.scrollTop || doc.documentElement.scrollTop;
        var delta = afterScrollTop - Blog.beforeScrollTop;

        if(delta < 0 && afterScrollTop !== 0) {
          post_header.className = 'header fix-header';
          post_msg.className = 'msg after-fix';
        } else {
          post_header.className = 'header';
          post_msg.className = 'msg';
        }

        Blog.beforeScrollTop = afterScrollTop;
      }, false);
    },

    hideWrapper: function() {
      var wrapper = doc.querySelector('.wrapper');

      if(wrapper)
      wrapper.addEventListener('click', function(){
        var i = 0;
        var scrollHeight = doc.body.scrollTop;
        var timer = setInterval(function() {
          window.scrollTo(0, scrollHeight);

          if(scrollHeight >= parseInt(Blog._getStyle(wrapper, 'height'))){
            clearInterval(timer);
          } else {
            scrollHeight += 0.25 * i * i;
            scrollHeight = scrollHeight > parseInt(Blog._getStyle(wrapper, 'height')) ? parseInt(Blog._getStyle(wrapper, 'height')) : scrollHeight;
            i++;
          }
        }, 10);

      }, false);
    },

    toLove: function() {
      var to_love = doc.querySelector('#to-love');

      var toLove = function() {
        this.className = 'loved';
        this.innerHTML = '<i class="icon-love"></i> Thankyou for your support.';

        Blog._ajax({
          type: 'POST',
          url: '/to-love',
          data: {
            id: to_love.getAttribute('data-id')
          },
          success: function(request) {
            var res = JSON.parse(request.responseText);

            if(res.status === 'success') {
              console.log('感谢您的支持 ^_^ ');
            }
          }
        });

        to_love.removeEventListener('click', toLove, false);
      };

      if(to_love)
      to_love.addEventListener('click', toLove, false);
    },

    init: function() {
      // 代码高亮
      Blog.highLight();
      Blog.hideWrapper();
      Blog.toLove();
      Blog.toTop();
      Blog.toggleFixPostHeader();

      // Disqus
      if(load_disqus)
      load_disqus.addEventListener('click', Disqus.load, false);
    }

  };

  Blog.init();

  console.info('%c相见就是%c缘分%c啊,还望留下宝贵的建议意见:\n%chttps://github.com/huangxutao/NB/issues','font-size:14px;','font-size:22px;color: #35bdb2;','font-size: 14px;', 'font-size: 22px;color: #35bdb2');

}(document, window));
