var User = require('../models/user');
var Form = require('../models/addForm');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/repos/:userName', function(req, res) {
    console.log('You`re on the right track' + req.params.userName)
    Form.find({repo_owner: req.params.userName}).then(function(repos) {
        res.json(repos);
        console.log(repos);
    }).catch(function(error) {
        console.log('There was an error' + error);
    });
});

module.exports = router;
