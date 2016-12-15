var User = require('../models/user');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/list', function (req, res) {
    User.find().then((users) => {
        res.send(users);
    });
});

module.exports = router;
