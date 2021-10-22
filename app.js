const fs = require('fs');
const { homedir } = require('os');

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://HinaNayani:insiyasakina@cluster0.6wlka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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



//create
// app.post('/users', (req, res) => {
//   MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
//     if (err) return console.error(err);
//     const db = client.db('node-demo');
//     const collection = db.collection('users');
//     collection
//       .insertOne(req.body)
//       .then(() => {
//         res.redirect('/');
//       })
//       .catch(() => {
//         res.redirect('/');
//       });
//   });
// });
//read
app.get('/', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .find()
      .toArray()
      .then((results) => {
        res.render('index.ejs', { users: results });
      })
      .catch((error) => {
        res.redirect('/');
      });
  });
});


module.exports = app;
