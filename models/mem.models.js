var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var memorySchema = new Schema({
    total : String,
    free : String,
    used : String,
});

module.exports = mongoose.model('Memory', memorySchema);
