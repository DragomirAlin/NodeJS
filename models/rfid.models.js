var mongoose = require('mongoose');
var Schema2 = mongoose.Schema;

var rfidUser = new Schema2({
    uid: String,
    nume: String,
},
{collection : 'user'}
);


module.exports = mongoose.model('user', rfidUser, 'user');
