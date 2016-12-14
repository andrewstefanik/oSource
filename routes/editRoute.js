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
    Form.findById(req.params.id).then(
        (doc) => {
            doc.repo_description = req.body.repo_description || doc.repo_description;
            doc.languages = req.body.languages || doc.languages;
            doc.skill_level = req.body.skill_level || doc.skill_level;
            doc.framework = req.body.framework || doc.framework;
            doc.save(function(err, newdoc) {
                res.json(newdoc)
            })
        });
});

module.exports = router;
