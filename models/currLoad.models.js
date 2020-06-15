var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var currentLoadSchema = new Schema({
    currentload	 : String,
    currentsystem : String,
});

module.exports = mongoose.model('currentLoadSchema', currentLoadSchema);
