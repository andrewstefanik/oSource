var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:term/:lang/:sort', (req, res) => {

    var term = req.params['term'];
    var lang = req.params['lang'] || null;
    var sort = req.params['sort'] || null;



    request.get(
        `https://api.github.com/search/repositories?q=${term}+language:${lang}&sort=${sort}&order=desc`,
        {headers: {'User-Agent': 'oSource'}} ,
        (err, resp, data) => {
            if (err) res.sendStatus(400);
            res.send(data);
        });
    });

    router.get('/user/:user', (req, res) => {
        console.log('request ser from route**************:   ', req.params['user']);
        var u = req.params['user'];

        request.get(`https://api.github.com/users/${u}/repos?per_page=200`,
            {headers: {"User-Agent": "oSource"}},
            function(err, response, data) {
                if(err) console.error(err);
                res.send({data:data});
            })
        })

        router.get('/:login/:repo', (req, res) => {
            var login = req.params['login'];
            var repo = req.params['repo'];

            console.log ('**** HERE: ', req.params.login);
            console.log ('**** HERE: ', req.params.repo);

            request.get(`https://api.github.com/repos/${login}/${repo}`,
                {headers: {'User-Agent': 'oSource'}},
                (err, response, data) => {
                    if (err) res.sendStatus (400);
                    res.send({data:data});
                });

            });



            module.exports = router;
