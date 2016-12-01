var express = require('express');
var request = require('request');
var router = express.Router();

request.get(`https://api.github.com/${user.userName}/repos?type=owner`,
    (err, resp, data) => {
        if (err) res.sendStatus(400);
        res.send(data);
    }
);
