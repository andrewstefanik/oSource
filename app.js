// Modules ===============================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var qs = require('querystring');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');

// Set up Database
var db = require('./config/database');
var config = require('./config/satellizer');

// Set Port
var port = process.env.PORT || 3000;

// Set view engine to ejs for the index page
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set the static files location public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Routes
// require('./api/routes')(app);
require('./routes/LoginRoute');


// Parse Application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('./routes/LoginRoute');

// Start Application
app.listen(port);

// Let user know which port
console.log('Server running on port' + port);

app.get('/', function (req, res, next) {
    res.render('index.ejs');
});


// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

var userSchema = new mongoose.Schema({
    displayName: String,
    picture: String,
    bitbucket: String,
    github: String,
    linkedin: String
});

var User = mongoose.model('User', userSchema);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});



//================ Login Required ================//

function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

//============ Generate JSON WebToken ===============//

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

//============ Login With LinkedIn ==============//

app.post('/auth/linkedin', function(req, res) {
  var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
  var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.LINKEDIN_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).send({ message: body.error_description });
    }
    var params = {
      oauth2_access_token: body.access_token,
      format: 'json'
    };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, qs: params, json: true }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ linkedin: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a LinkedIn account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.linkedin = profile.id;
            user.picture = user.picture || profile.pictureUrl;
            user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ linkedin: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          var user = new User();
          user.linkedin = profile.id;
          user.picture = profile.pictureUrl;
          user.displayName = profile.firstName + ' ' + profile.lastName;
          user.save(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

// //======================== Login With BitBucket ====================//
//
// app.post('/auth/bitbucket', function(req, res) {
//   var accessTokenUrl = 'https://bitbucket.org/site/oauth2/access_token';
//   var userApiUrl = 'https://bitbucket.org/api/2.0/user';
//   var emailApiUrl = 'https://bitbucket.org/api/2.0/user/emails';
//
//   var headers = {
//     Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + config.BITBUCKET_SECRET).toString('base64')
//   };
//
//   var formData = {
//     code: req.body.code,
//     redirect_uri: req.body.redirectUri,
//     grant_type: 'authorization_code'
//   };
//
//   // Step 1. Exchange authorization code for access token.
//   request.post({ url: accessTokenUrl, form: formData, headers: headers, json: true }, function(err, response, body) {
//     if (body.error) {
//       return res.status(400).send({ message: body.error_description });
//     }
//
//     var params = {
//       access_token: body.access_token
//     };
//
//     // Step 2. Retrieve information about the current user.
//     request.get({ url: userApiUrl, qs: params, json: true }, function(err, response, profile) {
//
//       // Step 2.5. Retrieve current user's email.
//       request.get({ url: emailApiUrl, qs: params, json: true }, function(err, response, emails) {
//         var email = emails.values[0].email;
//
//         // Step 3a. Link user accounts.
//         if (req.header('Authorization')) {
//           User.findOne({ bitbucket: profile.uuid }, function(err, existingUser) {
//             if (existingUser) {
//               return res.status(409).send({ message: 'There is already a Bitbucket account that belongs to you' });
//             }
//             var token = req.header('Authorization').split(' ')[1];
//             var payload = jwt.decode(token, config.TOKEN_SECRET);
//             User.findById(payload.sub, function(err, user) {
//               if (!user) {
//                 return res.status(400).send({ message: 'User not found' });
//               }
//               user.bitbucket = profile.uuid;
//               user.email = user.email || email;
//               user.picture = user.picture || profile.links.avatar.href;
//               user.displayName = user.displayName || profile.display_name;
//               user.save(function() {
//                 var token = createJWT(user);
//                 res.send({ token: token });
//               });
//             });
//           });
//         } else {
//           // Step 3b. Create a new user account or return an existing one.
//           User.findOne({ bitbucket: profile.id }, function(err, existingUser) {
//             if (existingUser) {
//               var token = createJWT(existingUser);
//               return res.send({ token: token });
//             }
//             var user = new User();
//             user.bitbucket = profile.uuid;
//             user.email = email;
//             user.picture = profile.links.avatar.href;
//             user.displayName = profile.display_name;
//             user.save(function() {
//               var token = createJWT(user);
//               res.send({ token: token });
//             });
//           });
//         }
//       });
//     });
//   });
// });
//
// //======================== Login With Github ==========================//
//
// app.post('/auth/github', function(req, res) {
//   var accessTokenUrl = 'https://github.com/login/oauth/access_token';
//   var userApiUrl = 'https://api.github.com/user';
//   var params = {
//     code: req.body.code,
//     client_id: req.body.clientId,
//     client_secret: config.GITHUB_SECRET,
//     redirect_uri: req.body.redirectUri
//   };
//
//   // Step 1. Exchange authorization code for access token.
//   request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
//     accessToken = qs.parse(accessToken);
//     var headers = { 'User-Agent': 'Satellizer' };
//
//     // Step 2. Retrieve profile information about the current user.
//     request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {
//
//       // Step 3a. Link user accounts.
//       if (req.header('Authorization')) {
//         User.findOne({ github: profile.id }, function(err, existingUser) {
//           if (existingUser) {
//             return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
//           }
//           var token = req.header('Authorization').split(' ')[1];
//           var payload = jwt.decode(token, config.TOKEN_SECRET);
//           User.findById(payload.sub, function(err, user) {
//             if (!user) {
//               return res.status(400).send({ message: 'User not found' });
//             }
//             user.github = profile.id;
//             user.picture = user.picture || profile.avatar_url;
//             user.displayName = user.displayName || profile.name;
//             user.save(function() {
//               var token = createJWT(user);
//               res.send({ token: token });
//             });
//           });
//         });
//       } else {
//         // Step 3b. Create a new user account or return an existing one.
//         User.findOne({ github: profile.id }, function(err, existingUser) {
//           if (existingUser) {
//             var token = createJWT(existingUser);
//             return res.send({ token: token });
//           }
//           var user = new User();
//           user.github = profile.id;
//           user.picture = profile.avatar_url;
//           user.displayName = profile.name;
//           user.email = profile.email;
//
//           user.save(function() {
//             var token = createJWT(user);
//             res.send({ token: token });
//           });
//         });
//       }
//     });
//   });
// });


//=================== Unlink Provider ========================//

app.post('/auth/unlink', ensureAuthenticated, function(req, res) {
  var provider = req.body.provider;
  var providers = ['github','linkedin','bitbucket'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send({ message: 'Unknown OAuth Provider' });
  }

  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User Not Found' });
    }
    user[provider] = undefined;
    user.save(function() {
      res.status(200).end();
    });
  });
});

// Export App
// exports = module.exports = app;
