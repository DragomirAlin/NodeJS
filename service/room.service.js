const Room = require("../models/room.models");
const RoomDto = require("../dto/RoomDto");



class RoomService {
    async getRoomByID(id) {
        try {
            const rooms = await Room.find({
                'camera': id
            });
            rooms.sort((el1, el2) => el1 < el2 ? 1 : -1);
            const lastRoom = rooms[0];
            // map to dto 
            const roomDto = new RoomDto(lastRoom.camera, lastRoom.temperatura, lastRoom.umiditatea, lastRoom.nivelGaz, lastRoom.usaIntrare);
            return roomDto;
        } catch (err) {
            throw Error(`ID ${id} not found`);
        }
    }

    async allRooms() {
        const rooms = await Room.find({ id: req.params.id });
        rooms.sort((el1, el2) => el1 < el2 ? 1 : 0);
        if (err) return next(err);
        res.send(rooms);
        return rooms;
    }

}

module.exports = new RoomService();