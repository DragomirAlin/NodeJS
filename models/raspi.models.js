var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var osSchema = new Schema({
    platform: String,
    hostname: String,
});


module.exports = mongoose.model('OS', osSchema);


