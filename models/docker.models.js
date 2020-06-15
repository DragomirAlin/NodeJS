var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var dockerContainerProcessesSchema = new Schema({
    state : String,
    elapsed : String,
});


module.exports = mongoose.model('DockerProcess', dockerContainerProcessesSchema);
