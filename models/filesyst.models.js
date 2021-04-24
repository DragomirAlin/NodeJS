var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filesystemSchema = new Schema({
    device : String,
    size : String,
});

module.exports = mongoose.model('FileSystem', filesystemSchema);
