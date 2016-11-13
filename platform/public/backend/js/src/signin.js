;(function(doc, win, tools) {
  var signinForm = doc.querySelector('.signin');
  var User = {
    toSignin: function() {
      var name = doc.querySelector('#name');
      var password = doc.querySelector('#password');
      var warning = doc.querySelector('.warning');

      if(name.value === '' || password.value === '') {
        warning.innerText = 'Can not submit with empty value!';
        tools.addClass(warning, 'show-warning');
        return false;
      } else {
        var a = doc.querySelector('.submit i');

        a.className = 'fa fa-circle-o-notch fa-spin fa-3x fa-fw';
        tools.ajax({
          type: 'POST',
          url: '/to-signin',
          data: {
            name: name.value,
            password: password.value
          },
          success: function(request) {
            var res = JSON.parse(request.responseText);

            if(res.status === 'success') {
              window.location = '/do-manage';
            } else {
              a.className = 'fa fa-chevron-right';
              warning.innerText = 'Username and password do not match';
              tools.addClass(warning, 'show-warning');
            }
          }
        });
      }
    }
  };

  signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    User.toSignin();
  }, false);
}(document, window, tools));
