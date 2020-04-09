var mongoose2 = require('mongoose');
var Schema = mongoose2.Schema;


var rfidUser = new Schema({
    uid: String,
    nume: String,
},
{collection : 'users'}
);


module.exports = mongoose2.model('users', rfidUser);