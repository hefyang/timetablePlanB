require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const register = require("./routes/api/register");
const subjects = require("./routes/api/subject");
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
// route for multiple subjects
app.get('/api/subjects/', subjects.allSubjects);
app.get('/api/subjects/:studentId',checkIfAuthenticated, subjects.restSubjects);

// route for single subject
app.get('/api/subject/:subjectId', subjects.subject);
app.get('/api/subject/:studentId/count', checkIfAuthenticated, subjects.selectSubjectCount);

// route for multiple sections
app.get('/api/sections/:subjectId', subjects.sections);

// route for editing timetable items
app.get('/api/timetable/:studentId',checkIfAuthenticated, subjects.timetable);
app.put('/api/timetable/',checkIfAuthenticated, subjects.updateTimetableSections);
app.delete('/api/timetable/:subjectId',checkIfAuthenticated, subjects.deleteTimetableSections);

// route for registration and login
app.get('/api/user/:studentId', register.user);
app.get('/api/user/confirmation/:token', register.confirm);
app.post('/api/user/register', register.register);
app.post('/api/user/login', register.login);

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
