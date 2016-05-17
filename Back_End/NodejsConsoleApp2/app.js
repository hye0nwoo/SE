var express = require('express');
var http = require('http');
var swig = require('swig');
var fs = require('fs')
var bp = require('body-parser');
var app = express();
var mysql = require("mysql");
var io = require("socket.io").listen(httpServer);
var http = require('http');
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'apmsetup',
    database : 'SW'
})
app.use(express.static(__dirname));
connection.connect();
var httpServer = http.createServer(app).listen(3000, function (req, res) {
    console.log("Server on!");
});
app.use(bp.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    fs.readFile('Main.html', function (error, data) {
        var data = swig.renderFile('Main.html', function (error, data){ res.send(data.toString()) });
        res.send(data);
    });
});
app.post('/login', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    connection.query('Select ID from user where id = ?', [id], function (error, result)
    {
        if (result.ID == id) {
            connection.query('Select Pass from user where id = ?', [id], function (error, result) {
                if (result.Pass == pass) {
                    req.session.id = id;
                    //메인 화면으로 넘어감
                     
                }
                else {
                    //비밀번호가 다릅니다 신호
                }
            });
        }
        else {
            //ID가 없습니다 신호
        }
    });


});
app.post('/signup', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    var pN = req.body.pN;
    connection.query('Select ID from user where id = ?', [id], function (error, result) {
        if (result.id == id) {
            //ID가 이미 존재합니다 신호
       }
        else {
            connection.query('insert into user values(?,?,?)', [id,pass,pN], function (error, result) {
                if (error) {

                }
                else {
                    //회원가입 완료 신호
                }
            });
        }
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


//소스트리 커밋테스트2