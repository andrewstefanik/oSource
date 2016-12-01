var express = require('express');
var request = require('request');
var router = express.Router();

request.get(`https://api.github.com/${user.userName}/repos`)
