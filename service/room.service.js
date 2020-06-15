const Room = require("../models/room.models");
const RoomDto = require("../dto/RoomDto");

class RoomService {

    //funcție pentru returnarea ultimului document sosit în server pentru fiecare cameră
    async getRoomByID(id) {
        try {
            const rooms = await Room.find({
                'camera': id
            });
            rooms.sort((el1, el2) => el1 < el2 ? 1 : -1);
            const lastRoom = rooms[0];
            // maparea datelor la schema RoomDto
            const roomDto = new RoomDto(lastRoom.camera, lastRoom.temperatura, lastRoom.umiditatea, lastRoom.nivelGaz, lastRoom.usa, lastRoom.foc, lastRoom.aer, lastRoom.apa, lastRoom.plante);
            return roomDto;
        } catch (err) {
            throw Error(`ID ${id} not found`);
        }
    }

    //funcție pentru afișarea tuturor datelor
    async allRooms() {
        const rooms = await Room.find({ id: req.params.id });
        rooms.sort((el1, el2) => el1 < el2 ? 1 : 0);
        if (err) return next(err);
        res.send(rooms);
        return rooms;
    }

}

module.exports = new RoomService();