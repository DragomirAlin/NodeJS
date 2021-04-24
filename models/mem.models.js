var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memorySchema = new Schema({
    total : String,
    free : String,
    used : String,
});

module.exports = mongoose.model('Memory', memorySchema);
