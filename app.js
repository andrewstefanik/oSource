// Modules ===============================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

// Set up Database
var db = require('./config/database');

// Set Port
var port = process.env.PORT || 3000;

// Set view engine to ejs for the index page
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set the static files location public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Routes
// require('./api/routes')(app);

// Parse Application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start Application
app.listen(port);

// Let user know which port
console.log('Server running on port' + port);

app.get('/', function (req, res, next) {
    res.render('index.ejs');
});

// Export App
exports = module.exports = app;
