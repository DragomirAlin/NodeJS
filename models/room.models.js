var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    camera: Number,
    temperatura: Number,
    umiditatea: Number,
    nivelGaz: String,
    usaIntrare: String,
    last_updated: Date
});


module.exports = mongoose.model('Room', RoomSchema);