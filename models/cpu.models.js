var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cpuSchema = new Schema({
    main : String,
});

module.exports = mongoose.model('CPU',cpuSchema);
