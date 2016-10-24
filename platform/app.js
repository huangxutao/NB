var express      = require('express');
var hbs          = require('hbs');
var session      = require('express-session');
var redisStore   = require('connect-redis')(session);
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes/index');


/***
 * for hbs helper
 */
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

// get format date
hbs.registerHelper('toFormatDate', function(date) {
  var this_date = {
    year: date.getFullYear().toString(),
    month: date.getMonth() < 9 ? '0' + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 ),
    day: date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  };

  return this_date.year + '-' + this_date.month + '-' + this_date.day;
});

// get year
hbs.registerHelper('toGetYear', function(date) {
  return date.getFullYear().toString();
});

// get month
hbs.registerHelper('toGetMonth', function(date) {
  return date.getMonth() < 9 ? '0' + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 );
});

// get day
hbs.registerHelper('toGetDay', function(date) {
  return date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
});

hbs.registerPartials(__dirname + '/views/layout/partials');
hbs.registerPartials(__dirname + '/views/backend/partials');



/***
 * for app
 */
var app    = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new redisStore(),
  resave: true,
  secret: 'a4f8071f-c873-4447-8ee2',
  cookie: { maxAge: 60 * 1000 * 60 }
}));
app.use(express.static(path.join(__dirname, 'public')));

// check session
app.use(function(req, res, next) {
  var url = req.originalUrl;
  var method = req.method;

  if(/\/do-manage/.test(url) && !req.session.user && url !== '/do-manage/signin') {
    return method === 'GET' ? res.redirect('/do-manage/signin') : res.json({result: 'fail', detail: '登录超时请重新登录'});
  }
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
