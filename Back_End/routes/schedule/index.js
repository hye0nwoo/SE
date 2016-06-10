var express = require('express');
var router = express.Router();
var config = require('../../config/config.json');
var mysql = require("mysql");
var flash = require('connect-flash')
var connection = mysql.createConnection(config.default.db);


router.get('/', function (req, res, next) {
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
    var sid = req.flash('sid');
    var pro = req.flash('pro');
    var name = req.flash('name');
    if (pro[0] == null) {

        pro = "";
    }
    req.flash('sid', sid);
    req.flash('pro', pro);
    req.flash('name', name);
    if (pro[0] == null) {
        res.redirect('/main');
        return;
    }
    
       
              connection.query('Select * from project_log where project_id = ? ORDER BY date', [pro], function (error, result) {
            var history = result;

                res.render('schedule/index.swig', { sid: sid, pro: pro, flag:"schedule", 
                    historys: history,
                    name : name
                });
           
    });
    
    
});

router.post('/', function (req, res, next) {
    var sid = req.flash('sid');
    var pro = req.flash('pro');

    req.flash('sid', sid);
    req.flash('pro', pro);
    connection.query('Select * from project_content where (project_id = ? AND flag = 1) order by seq', [pro], function (error, result1) {
        var title = result1;
        
        connection.query('Select * from project_content where (project_id = ? AND flag = 0) order by seq', [pro], function (error, result2) {
            var card = result2;
            res.send({
                sid: sid, pro: pro, 
                titles: title,
                cards: card}
                   
               
            );

        });
    });


});

router.post('/add_card', function (req, res) {
    var seq;
    var pro = req.flash('pro');
    req.flash('pro', pro);
  

    connection.query('Select * from project_content ORDER BY seq', function (error, result) {
        if (result.length == 0) seq = 0;
        else seq = result[result.length - 1].seq + 1;
        if (req.body.flag == 0) {
            connection.query('insert into project_content values (?,?,?,?,?,?,?,?,?) ', [seq, pro, req.body.col, '', '', '', req.body.title, req.body.content, 0], function (error, result) {
               
                res.send('????');
            });
        }
        else if (req.body.flag == 1) {
            connection.query('insert into project_content values (?,?,?,?,?,?,?,?,?) ', [seq, pro, req.body.col, '', '', '', req.body.title, req.body.content, 1], function (error, result) {
                

                res.send('????');
            });
        }


    });
});
   
router.post('/remove_col', function (req, res) {
    var pro = req.flash('pro');
    req.flash('pro', pro);
    connection.query('delete from project_content where project_id = ? AND col = ?', [pro, req.body.col], function (error, result) {
        console.log(error);
        res.send('????');
    });
});
router.post('/remove_card', function (req, res) {
    var pro = req.flash('pro');
    req.flash('pro', pro);
    connection.query('delete from project_content where project_id = ? AND seq = ?', [pro, req.body.seq], function (error, result) {
        console.log(error);
        res.send('????');
    });
});

router.post('/add_log', function (req, res) {
    var pro = req.flash('pro');
    req.flash('pro', pro);
    
    var seq;
   
    connection.query('Select * from project_log ORDER BY seq', function (error, result) {
        if(result.length == 0) seq = 0;
    	else	seq = result[result.length-1].seq + 1;
        var date = new Date();
        connection.query('insert into project_log values (?,?,?,?)', [seq, pro, date, req.body.log], function (error, result) {
            res.send('????');
        });
    });
});

router.post('/getSeq',function(req,res){
   var seq
   connection.query('Select * from project_content ORDER BY seq', function (error, result) {
        if(result.length == 0) seq = 0;
        else	seq = result[result.length-1].seq + 1;
        seq = 'card'+seq;
        res.send(seq);
    });

});

router.post('/update', function (req, res) {
    
    connection.query('update project_content set col = ?, content = ? where seq = ?',[req.body.col,req.body.content,req.body.seq], function (error, result) {
        console.log(error);
        res.send();
    });

});

module.exports = router;