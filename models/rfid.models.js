var mongoose2 = require('mongoose');
var Schema2 = mongoose2.Schema;

// Schemă pentru documentele JSON 
var rfidUser = new Schema2({
    uid: String,
    nume: String,
},
);


module.exports = mongoose2.model('user', rfidUser, 'user');