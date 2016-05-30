//필요 모듈 import
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require("mysql");
var http = require('http');
var swig = require('swig');
var path = require('path');

var app = express();



// view engine setup
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('view cache',({cache:false}));

var httpServer = http.createServer(app).listen(3000, function (req, res) {
    console.log("Server on!");
});
var io = require("socket.io").listen(httpServer);
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

io.sockets.on('connection', function (socket) {
    // 사용자 채팅 메시지 broadcast
    socket.on('user message', function (msg) {
        socket.broadcast.emit('user message', socket.nickname, msg);
    });

    // 사용자 접속시 Nickname 처리 public 
    socket.on('nickname', function (nick, fn) {
        if (nicknames[nick]) {
            fn(true);
        } else {
            fn(false);
            nicknames[nick] = socket.nickname = nick;
            // 사용자 대화창에 알림 broadcast
            socket.broadcast.emit('announcement', nick + '님 들어오셨습니다.');
            // 전체 접속사용자 리스트 broadcast
            socket.broadcast.emit('nicknames', nicknames);
            socket.emit('nicknames', nicknames);
        }
    });

    socket.on('disconnect', function () {
        if (!socket.nickname) return;
        delete nicknames[socket.nickname];
        socket.broadcast.emit('announcement', socket.nickname + '님 나가셨습니다.');
        socket.broadcast.emit('nicknames', nicknames);
    });
});
