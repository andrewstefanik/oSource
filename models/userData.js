var mongoose = require('mongoose');
var userDataSchema = new mongoose.Schema({
    user: String,
    repos: Object
});

module.exports = mongoose.model('userData', userDataSchema);
