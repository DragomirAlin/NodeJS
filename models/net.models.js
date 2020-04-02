var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var networkSchema = new Schema({
    ip4 : String,
    speed : String,
    dhcp : String,
});

module.exports = mongoose.model('Network', networkSchema);
