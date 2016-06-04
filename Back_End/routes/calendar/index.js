var express = require('express');
var router = express.Router();
var config = require('../../config/config.json');
var mysql = require("mysql");
var flash = require('connect-flash')
var connection = mysql.createConnection(config.default.db);

router.get('/', function (req, res, next) {
    var sid = req.flash('sid');
    var name = req.flash('name');
    req.flash('sid', sid);
    req.flash('name', name);
    res.render('calendar/index.swig', { sid: sid, name: name });
   
});
router.post('/add', function (req, res) {
    var seq;
    console.log("신호받음");
    connection.query('Select * from schedule', function (error, result) {
        seq = result.length + 1;
        connection.query('insert into schedule values (?,?,?,?,?,?,?,?,?,?)', [seq, req.body.member_id,req.body.flag,req.body.startDate,req.body.endDate,"",req.body.title,req.body.content,req.body.color_background,req.body.color_foreground], function (error, result) {
            console.log(error);
        });
    });
});
router.post('/down', function (req, res) {
    id = req.body.pid;
    connection.query('Select * from schedule where member_id = ?', [id], function (error, result) {
        for(var i=0;i<result.length;i++)
        {
            result[i].start_date.setTime(result[i].start_date.getTime() + 32400000);
            result[i].end_date.setTime(result[i].end_date.getTime() + 32400000);
        }
        res.send(result);
    });
});
router.post('/delete', function (req, res) {
    title = req.body.title;
    connection.query('delete from schedule where title = ?', [title], function (error, result) {
        
    });
});
module.exports = router;