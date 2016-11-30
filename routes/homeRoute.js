module.exports = function(app) {
    app.get('/', function (req, res, next) {
        res.render('index.ejs');
    });

    app.get('/profile', function(request, response, next) {
        response.render('/js/ngApp/profile/profile.html');
    });
};
