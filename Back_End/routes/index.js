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
            connection.query('Select name from member_info where member_id = ?', [id], function (error, result2)
            {
                if(result[0].password == pass)
                {
                    req.flash('name',result2[0].name)
                    req.flash('uid', id);
                    req.flash('sid', id);
                    res.send("성공");
                 
                
                }
                else {
                    res.send("실패");
                }
            });
            
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
function result(pname,pid)
{
    this.pName = pname;
    this.pID = pid;
}
router.get('/main', function (req, res) {
   
    var sid = req.flash('sid');
    var name = req.flash('name');
    req.flash('sid', sid);
    req.flash('name', name);
    res.render('project/index.swig',{ sid: sid, name: name });
})
router.post('/main1', function (req, res) {
    var id = req.body.id;
    connection.query('Select project_name,project_id from project_info where member1_id = ?', [id], function (error, result1) {
        connection.query('Select project_name,project_id from project_info where member2_id = ?', [id], function (error, result2) {
            connection.query('Select project_name,project_id from project_info where member3_id = ?', [id], function (error, result3) {
                connection.query('Select project_name,project_id from project_info where member4_id = ?', [id], function (error, result4) {
                    connection.query('Select project_name,project_id from project_info where member5_id = ?', [id], function (error, result5) {
                        var tResult = [];
                        var j = 0;
                        if(result1.length !=0)
                        {
                            for(var i=0;i<result1.length;i++)
                            {
                                tResult[j] = new result(result1[i].project_name, result1[i].project_id);
                                j++
                            }
                        }
                        if (result2.length != 0) {
                            for (var i = 0; i < result2.length; i++) {
                                tResult[j] = new result(result2[i].project_name, result2[i].project_id);
                                j++
                            }
                        }
                        if (result3.length != 0) {
                            for (var i = 0; i < result3.length; i++) {
                                tResult[j] = new result(result3[i].project_name, result3[i].project_id);
                                j++
                            }
                        }
                        if (result4.length != 0) {
                            for (var i = 0; i < result4.length; i++) {
                                tResult[j] = new result(result4[i].project_name, result4[i].project_id);
                                j++
                            }
                        }
                        if (result5.length != 0) {
                            for (var i = 0; i < result5.length; i++) {
                                tResult[j] = new result(result5[i].project_name, result5[i].project_id);
                                j++
                            }
                        }
                        console.log(tResult[0].pName);
                        res.send(tResult);
                    });
                });
            });
        });
    });
})
router.post('/main2', function (req, res) {
    var seq;
    var mem1=req.body.member1, mem2="", mem3="", mem4="", mem5="";
    console.log(req.body.member1);
    connection.query('Select * from project_info', function (error, result) {
        seq = result.length + 1;
   
    console.log(seq);
    if (req.body.member2 != null)
    {
        mem2 = req.body.member2;
    }
    if (req.body.member3 != null) {
        mem3 = req.body.member3;
    }
    if (req.body.member4 != null) {
        mem4 = req.body.member4;
    }
    if (req.body.member5 != null) {
        mem5 = req.body.member5;
    }
    connection.query('insert into project_info values (?,?,?,?,?,?,?,?,?,?,?,?)', [seq, req.body.name, req.body.PID, req.body.SD, req.body.ED, req.body.PE, req.body.MN, mem1, mem2, mem3, mem4, mem5], function (error, result) {
        console.log(error);
        res.send("성공");

    });
    });
})



module.exports = router;