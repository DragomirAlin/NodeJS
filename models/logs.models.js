var mongoose2 = require('mongoose');
var Schema2 = mongoose2.Schema;

// Schemă pentru documentele JSON 
var logs = new Schema2({
    nume: String,
    data: String,
    uid: String,
},
 {collection : 'log'}
);


module.exports = mongoose2.model('log', logs, 'log');