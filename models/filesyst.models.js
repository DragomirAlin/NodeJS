var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var filesystemSchema = new Schema({
    device : String,
    size : String,
});

module.exports = mongoose.model('FileSystem', filesystemSchema);
