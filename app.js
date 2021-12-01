var createError = require('http-errors');
//nhận đối tượng
var express = require('express');
//kích hoạt express
var app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
//loginfacebook
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Account = require('./Routes/Account');
var Subject = require('./Routes/Subject');

var config = require('./Config/config_auth')
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


//cros
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account/', Account);
app.use('/subject/', Subject);

require('dotenv').config();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app;

