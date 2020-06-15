var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemă pentru documentele JSON 
var cpuSchema = new Schema({
    main : String,
});

module.exports = mongoose.model('CPU',cpuSchema);