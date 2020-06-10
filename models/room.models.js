var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    camera: Number,
    temperatura: Number,
    umiditatea: Number,
    nivelGaz: String,
    usa: String,
    foc: String,
    aer: Number,
    apa: String,
    plante: String,
    
}
);

module.exports = mongoose.model('rooms', RoomSchema, 'rooms');
