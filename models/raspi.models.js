var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var osSchema = new Schema({
    platform: String,
    hostname: String,
});


module.exports = mongoose.model('OS', osSchema);


