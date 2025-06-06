var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('./mysql.js');

const usersRouter = require('./routes/utilisateurs');
const categoriesRouter = require('./routes/categories');
const sousCategoriesRouter = require('./routes/souscategories');
const tiersRouter = require('./routes/tiers');
const comptesRouter = require('./routes/comptes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/utilisateurs', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/sous-categories', sousCategoriesRouter);
app.use('/tiers', tiersRouter);
app.use('/comptes', comptesRouter);

const CompteNotFoundError = require('./errors/comptesError').CompteNotFoundError;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.statusCode || 500);
  res.render('error', { error: err });
});

mysql.connectMySQL();

module.exports = app;
