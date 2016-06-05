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
    res.render('schedule/index.swig', { sid: sid, name: name, flag:"schedule" });
});









router.post('/add_card', function (req, res) {
    var seq;
    connection.query('Select * from project_content', function (error, result) {
    	if(result.length == 0) seq = 0;
    	else	seq = result[result.length-1].seq + 1;

        connection.query('insert into project_content values (?,?,?,?,?,?,?,?)', [seq, req.body.project_id, req.body.column, req.body.row, req.body.startDate, req.body.endDate, req.body.title, req.body.content], function (error, result) {
        });
    });
});

router.post('/modify_card', function (req, res) {
    var date = new Date();
    connection.query('Select * from project_content', function (error, result) {
        connection.query('UPDATE project_content SET column = ?, row = ?, start_date = ?, end_date = ?, title = ?, content = ? WHERE project_id = ? AND column = ? AND row = ?', [req.body.new_column, req.body.new_row, req.body.new_start_date, req.body.new_end_date, req.body.new_title, req.body.new_content, req.body.project_id, req.body.original_column, req.body.original_row], function (error, result) {
        });
    });
});

router.post('/remove_card', function (req, res) {
    connection.query('delete from project_content where project_id = ? AND column = ? AND row = ?', [req.body.project_id, req.body.column, req.body.row], function (error, result) {    
    });
});

router.post('/add_log', function (req, res) {
    var seq;
    var date = new Date();
    connection.query('Select * from project_log', function (error, result) {
        if(result.length == 0) seq = 0;
    	else	seq = result[result.length-1].seq + 1;

        connection.query('insert into project_log values (?,?,?,?)', [seq, req.body.project_id, date, log], function (error, result) {
        });
    });
});

module.exports = router;