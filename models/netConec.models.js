var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var networkConnection = new Schema({
   ssid: String,
    signal : String,
    quality: String,
});


module.exports = mongoose.model('NetworkConnection', networkConnection);
