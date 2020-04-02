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

var osSchema = new Schema({
    platform: String,
    hostname: String,
 

})

var networkSchema = new Schema({
    ip4 : String,
    speed : String,
    dhcp : String,
})

var filesystemSchema = new Schema({
    device : String,
    size : String,
})

var processSchema = new Schema({
    cpu : String,
    mem : String,
})

var memorySchema = new Schema({
    total : String,
    free : String,
    used : String,
})

var cpuSchema = new Schema({
    main : String,
})


module.exports = mongoose.model('Room', RoomSchema);
// module.exports = mongoose.model('OS', osSchema);
// module.exports = mongoose.model('Network', networkSchema);
// module.exports = mongoose.model('FileSystem', filesystemSchema);
// module.exports = mongoose.model('Process', processSchema);
// module.exports = mongoose.model('Memory', memorySchema);
// module.exports = mongoose.model('CPU',cpuSchema);

