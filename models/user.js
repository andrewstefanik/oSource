var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  displayName: String,
  userName: String,
  picture: String,
  bitbucket: String,
  github: String,
  linkedin: String,
  linkedProfile: String
});

module.exports = mongoose.model('User', userSchema);
