var tools = (function(mod) {
  mod.hasClass = function(obj, cls) {
		return obj.className.match(new RegExp('(^|\\s)' + cls + '(\\s|$)'));
	};

	mod.addClass = function(obj, cls) {
		if(!this.hasClass(obj, cls)){
      obj.className += ' '+ cls;
    }
	};

	mod.removeClass = function(obj, cls) {
		var str = new RegExp('(^|\\s)' + cls + '(\\s|$)');
    if(this.hasClass(obj, cls)){
      obj.className = obj.className.replace( str, '');
    }
	};

	mod.toggleClass = function(obj, cls) {
		return (!this.hasClass(obj, cls)) ? this.addClass( obj, cls) : this.removeClass( obj, cls);
	};

  mod.isEmpty = function (obj) {
    for(var value in obj) {
      return false;
    }
    return true;
  };

	mod.ajax = function(args) {
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
	};

  mod.getStyle = function (obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
  };

  mod.transition = function(obj, name, duration) {
    var time = duration || 3000;
    obj.style.transition = 'all ' + time/1000 + 's ease';
    this.toggleClass(obj, name);
    setTimeout(function() {
      tools.toggleClass(obj, 'hide');
    }, time);
  };

	return mod;
}(window.tools || {}));
