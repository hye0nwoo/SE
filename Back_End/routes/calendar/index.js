var express = require('express');
var router = express.Router();
var config = require('../../config/config.json');

router.get('/', function(req, res, next) {
    res.render('schedule/layout.swig');
});

module.exports = router;