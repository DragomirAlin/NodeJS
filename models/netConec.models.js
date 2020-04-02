var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var networkConnection = new Schema({
    localaddress: String,
    localport : String
});


module.exports = mongoose.model('NetworkConnection', networkConnection);
