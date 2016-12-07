var mongoose = require('mongoose');
var formSchema = new mongoose.Schema({

    repo_name: String,
    repo_link: String,
    repo_description: String,
    languages: String,
    framework: String,
    skill_level: String
});

module.exports = mongoose.model('Form', formSchema);
