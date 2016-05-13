var express = require('express');
var http = require('http');
var swig = require('swig');
var fs = require('fs')
var bp = require('body-parser');
var app = express();
var mysql = require("mysql")
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'apmsetup',
    database : 'SW'
})
connection.connect();

app.use(bp.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    fs.readFile('Login.html', function (error, data) {
        swig.renderFile('Login.html',function(error,data){res.send(data.toString())});
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

app.listen(3000, function () {
    console.log('server on!');
});
//소스트리 커밋테스트2