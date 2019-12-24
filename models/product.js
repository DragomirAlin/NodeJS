var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    camera: Number,
    temperatura: Number,
    umiditatea: Number,
    nivelGaz: String,
    last_updated: Date



});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);