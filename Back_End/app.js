//필요 모듈 import
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require("mysql");
var http = require('http');
var swig = require('swig');

var app = express();

// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

connection.connect();
var httpServer = http.createServer(app).listen(3000, function (req, res) {
    console.log("Server on!");
});
app.use(bodyParser.urlencoded({ extended: false }));


//express 환경 setup
app.use(session({
    secret: 'PMS',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static(path.join(__dirname, 'public')));



//컨트롤러 라우팅 셋업
app.use('/', require('./routes/index'));
// calendar
app.use('/calendar', require('./routes/calendar/index'));
//schedule
app.use('/schedule', require('./routes/schedule/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});
