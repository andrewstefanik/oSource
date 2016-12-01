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

router.get('/:reponame', (req, res) => {
    request.get(`https://api.github.com/search/repositories?q=${req.params['reponame']}`,
    {headers: {"User-Agent": "oSource"}},
    function(err, response, data) {
        if(err) console.error(err);
        res.send(data);
    }
    )
})

module.exports = router;
