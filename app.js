var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var customerRouter = require('./routes/customer');
var createCustomer = require('./routes/create-customer');
var editCustomer = require('./routes/edit-customer');
var dltCustomer = require('./routes/delete-customer');
var invoice = require('./routes/invoice');
var generateInvoice = require('./routes/generate-invoice');
var invoiceList = require('./routes/invoice-list');
var multer = require('multer')
var bodyParser = require("body-parser");
var logoSchema = require("./module/logo")








var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// using routers
app.use('/', indexRouter);
app.use('/login', usersRouter);
app.use('/signup', signupRouter);
app.use('/customers', customerRouter);
app.use('/create-customer', createCustomer);
app.use('/edit-customer', editCustomer);
app.use('/delete-customer', dltCustomer);
app.use('/invoice', invoice);
app.use('/generate-invoice', generateInvoice);
app.use('/invoice-list', invoiceList);



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
  res.render(err);
});


module.exports = app;
