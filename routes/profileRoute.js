var User = require('../models/user');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/repos', (request, response) => {
    var userName;
    // console.log('$$$$$$$$$$$$$$$ Hello');

    // User.find().then((user) => {
    //     // console.log(request);
    // })

    console.log('Above the get');
    request.get('https://api.github.com/user/repos',
        { headers: {'User-Agent': 'oSource'}},
        (error, response, data) => {
            console.log('Hello $$$$$$$$$');

            if (error) response.sendStatus(400);
            response.send(data);
        })
    });

module.exports = router;
