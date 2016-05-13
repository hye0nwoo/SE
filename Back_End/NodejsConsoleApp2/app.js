var express = require('express');
var http = require('http');
var swig = require('swig');
var fs = require('fs')
var bp = require('body-parser');
var app = express();
var mysql = require("mysql")
app.use(bp.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    fs.readFile('Login.html', function (error, data) {
        swig.renderFile('Login.html',function(error,data){res.send(data.toString())});
    });
});
app.post('/login', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;

});
app.post('/signup', function (req, res) {
    var id = req.body.id;
    var pass = req.body.pass;
    var pN = req.body.pN;
});

app.listen(3000, function () {
    console.log('server on!');
});