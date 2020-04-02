var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currentLoadSchema = new Schema({
    currentload	 : String,
    currentsystem : String,
});

module.exports = mongoose.model('currentLoadSchema', currentLoadSchema);
