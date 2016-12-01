var express = require('express');
var request = require('request');
var router = express.Router();

request.get('/:userName/repos', (request, response) => {
    var userName = $scope.userName;

    request.get(`https://api.github.com/${user.userName}/repos?type=owner`,
        { headers: {'User-Agent': 'oSource'}},
        (error, response, data) => {
            if (error) response.sendStatus(400);
            response.send(data);
        })
    });
