var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var networkConnection = new Schema({
   ssid: String,
    signal : String,
    quality: String,
});


module.exports = mongoose.model('NetworkConnection', networkConnection);
