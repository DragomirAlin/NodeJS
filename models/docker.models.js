var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dockerContainerProcessesSchema = new Schema({
    state : String,
    elapsed : String,
});


module.exports = mongoose.model('DockerProcess', dockerContainerProcessesSchema);
