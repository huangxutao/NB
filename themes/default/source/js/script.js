;(function() {
  function ajax(args) {
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

  ajax({
    type: 'POST',
    url: '/get-posts',
    data: {
      page: 8
    },
    success: function(request) {
      var res = JSON.parse(request.responseText);
      console.log(res);
    }
  });
}());