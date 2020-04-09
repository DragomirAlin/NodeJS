var mongoose2 = require('mongoose');
var Schema = mongoose2.Schema;


var logs = new Schema({
    nume: String,
    data: String,
    uid: String,
});


module.exports = mongoose2.model('logs', logs);