var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('../config/config.json');
var mysql = require("mysql");
var connection = mysql.createConnection(config.default.db);
var crypto = require('crypto');

connection.connect();
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/', function (req, res) {
    if (req.session.flash != null) {
        res.redirect('/main');
        return;
    }
    res.render('login_signup/login.swig');
    });

router.post('/login', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    var shasum = crypto.createHash('sha1')
    shasum.update(pass);
    pass = shasum.digest('hex');
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
    var shasum = crypto.createHash('sha1')
    shasum.update(pass);
    pass = shasum.digest('hex');
   
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
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
    var sid = req.flash('sid');
    var name = req.flash('name');
    var pro = req.flash('pro')
    if (pro[0] == null)
    {
        
        pro = "";
    }
    req.flash('sid', sid);
    req.flash('name', name);
    req.flash('pro', pro);
    res.render('project/index.swig',{ sid: sid, name: name,flag:"main",pro:pro });
})
router.post('/main1', function (req, res) {
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
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
                        res.send(tResult);
                    });
                });
            });
        });
    });
})
router.post('/main2', function (req, res) {
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
    var seq;
    var mem1=req.body.member1, mem2="", mem3="", mem4="", mem5="";
    connection.query('Select * from project_info', function (error, result) {
        seq = result.length + 1;
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
        
        res.send("성공");

    });
    });
})

router.post('/main3', function (req, res) {
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
    req.flash('pro');
    req.flash('pro', req.body.pro);
    res.send('성공');
})

router.post('/userinfo', function (req, res) {
    
    var uid = req.flash('uid');
    req.flash('uid', uid);
    connection.query('select * from member_info where member_id = ?',[uid] , function (error, result) {
        res.send(result[0]);
    });
})

router.post('/editinfo', function (req, res) {
    var id = req.flash('uid');
    req.flash('uid', id);
    var opass = req.body.opass;
    var pass = req.body.pass;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var shasum = crypto.createHash('sha1')
    shasum.update(pass);
    pass = shasum.digest('hex');
    var shasum2 = crypto.createHash('sha1')
    shasum2.update(opass);
    opass = shasum2.digest('hex');
    connection.query('Select password from member_info where member_id = ?', [id], function (error, result) {
        if(result[0].password!=opass)
        {
            res.send("비번오류");
        }
        else
        {
            connection.query('update member_info set password=?,name=?,email=?,phone=? where member_id = ?', [pass, name, email, phone,id], function (error, result) {
                
                res.send("성공");
            });
        }
    });
})

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {

    })
    res.redirect('/');
})

router.post('/editp', function (req, res) {
    if (req.session.flash == null) {
        res.redirect('/');
        return;
    }
    connection.query('select * from project_info where project_id = ?', [req.body.pid], function (error, result) {
        result[0].start_date.setTime(result[0].start_date.getTime() + 32400000);
        result[0].end_date.setTime(result[0].end_date.getTime() + 32400000);
        res.send(result[0]);
    });
})
router.post('/check', function (req, res) {
    connection.query('Select * from member_info where member_id = ?', [req.body.uid], function (error, result) {
        if (result.length==0) res.send("실패");
        else res.send("성공");
    });
})

router.post('/del', function (req, res) {
    connection.query('delete from project_content where project_id = ?', [req.body.pid], function (error, result) {
        connection.query('delete from project_info where project_id = ?', [req.body.pid], function (error, result) {
            connection.query('delete from project_log where project_id = ?', [req.body.pid], function (error, result) {
                res.send("성공");
            });
        });
    });
})

router.post('/editcommit', function (req, res) {
    var mem2 = "", mem3 = "", mem4 = "", mem5 = "";
   
    
        if (req.body.member2 != null) {
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
        connection.query('update project_info set project_name=?,start_date=?,end_date=?,project_explain=?,member_number=?,member2_id=?,member3_id=?,member4_id=?,member5_id=? where project_id = ?', [req.body.name, req.body.SD, req.body.ED, req.body.PE, req.body.MN, mem2, mem3, mem4, mem5,req.body.PID], function (error, result) {
           
            res.send("성공");

        });
    
})

router.get('/ppt_sample', function (req, res, next) {
    res.render('ppt_sample.swig');
   
});

module.exports = router;