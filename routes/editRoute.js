var Form = require('../models/addForm');
var mongoose = require('mongoose');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:id', function(req, res) {
    console.log('Sweet glory', req.params.id);
    Form.findById(req.params.id).then(function(form) {
        res.json(form);
        console.log(form);
    }).catch(function(error) {
        console.log('There was an error' + error);
    });
});

module.exports = router;
