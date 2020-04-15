var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    camera: Number,
    temperatura: Number,
    umiditatea: Number,
    nivelGaz: String,
    usaIntrare: String,
    last_updated: Date
}
);




module.exports = mongoose.model('rooms', RoomSchema, 'rooms');
// module.exports = mongoose.model('OS', osSchema);
// module.exports = mongoose.model('Network', networkSchema);
// module.exports = mongoose.model('FileSystem', filesystemSchema);
// module.exports = mongoose.model('Process', processSchema);
// module.exports = mongoose.model('Memory', memorySchema);
// module.exports = mongoose.model('CPU',cpuSchema);

