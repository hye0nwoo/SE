var express = require('express');
var router = express.Router();
var config = require('../config/config.json');


router.get('/', function (req, res) {
    res.render('index.swig');
    });

router.post('/login', function (req, res) {
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
router.post('/signup', function (req, res) {
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



module.exports = router;