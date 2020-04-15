var mongoose2 = require('mongoose');
var Schema2 = mongoose2.Schema;


var logs = new Schema2({
    nume: String,
    data: String,
    uid: String,
}
// {collection : 'logs'}
);


module.exports = mongoose2.model('logs', logs, 'logs');