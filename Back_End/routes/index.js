var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('../config/config.json');
var mysql = require("mysql");
var connection = mysql.createConnection(config.default.db);

connection.connect();
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/', function (req, res) {
    res.render('login_signup/login.swig');
    });

router.post('/login', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    connection.query('Select password from member_info where member_id = ?', [id], function (error, result)
    {
        if(result.length == 0)
        {
            res.send("실패");
        }
        else
        {

            if(result[0].password == pass)
            {

                res.send("성공");
            }
            else
            {
                res.send("실패");
            }
        }
    });


});
router.get('/signup', function (req, res) {
    res.render('login_signup/signup.swig');
});

router.post('/signup', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    connection.query('Select member_id from member_info where member_id = ?', [id], function (error, result) {
        if (error)
        {
            res.send("서버");
        }
        if (result.length != 0) {

            res.send("중복");
        }
        else
        {
            connection.query('Select * from member_info', function (error, result) {
                var seq = result.length + 1;
                var cdate = new Date();
                connection.query('insert into member_info values (?,?,?,?,?,?,?)', [seq, id, pass, email,name , phone, cdate], function (error, result) {
                    res.send("성공");
                });
            });

        }
    });
});




module.exports = router;