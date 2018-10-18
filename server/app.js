const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const register = require("./routes/api/register");
const checkIfAuthenticated = require("./middleware/checkIfAuthenticated").checkIfAuthenticated;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/api/users', checkIfAuthenticated, register.users);
app.post('/api/user', register.user);
app.post('/api/register', register.register);
app.get('/api/confirmation/:token', register.confirm);
app.post('/api/login', register.login);

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

module.exports = app;
