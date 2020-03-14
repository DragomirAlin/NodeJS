var Room = require('../models/room.models');
const roomService = require("../service/room.service");

exports.room_create = function (req, res) {
    var room = new Room(
        {
            camera: req.body.camera,
            temperatura: req.body.temperatura,
            umiditatea: req.body.umiditatea,
            nivelGaz: req.body.nivelGaz,
            usaIntrare: req.usaIntrare
        }
    );

    room.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Room Created successfully')
    })
};

exports.roomById = async (request, response, next) => {
    const roomId = request.params.id;
    roomService
      .getRoomByID(roomId)
      .then(room => response.send(room))
      .catch(err => {
        console.log("here");
        next(err);
      });
  };

exports.room_update = function (req, res) {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, room) {
        if (err) return next(err);
        res.send('Room updated.');
    });
};

exports.room_delete = function (req, res) {
    Room.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};






