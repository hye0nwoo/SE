//필요 모듈 import
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require("mysql");
var http = require('http');
var swig = require('swig');
var path = require('path');
var flash = require('connect-flash')
var MemoryStore = session.MemoryStore;
var sessionStore = new MemoryStore();
var SessionSockets = require('session.socket.io-express4');
var app = express();
app.use(session({
    secret: 'PMS',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('view cache',({cache:false}));

var httpServer = http.createServer(app).listen(3000, function (req, res) {
    console.log("Server on!");
});
var io = require("socket.io").listen(httpServer);



//express 환경 setup



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

var sessionSockets = new SessionSockets(io, sessionStore, cookieParser("PMS"));


sessionSockets.on('connection', function (err,socket,session) {
    // 사용자 채팅 메시지 broadcast
    socket.on('user message', function (data) {
        socket.emit('user message', { uid: session.flash.uid[0], msg: data.msg,date : data.date });
        socket.broadcast.emit('user message', { uid: session.flash.uid[0], msg: data.msg, date: data.date });
    });
       
});
