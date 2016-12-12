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

router.post('/:id', function(req, res) {

    Form.findById(req.params.id).then(function(form) {
        form = req.body;

        form.save().then(function(updatedForm) {
            res.json(updatedForm);
            console.log('You are saving: ', updatedForm);
        }).catch(function(err) {
            res.status(400).json(err);
        });
    }).catch(function(){
        res.sendStatus(404);
    });
});

module.exports = router;
