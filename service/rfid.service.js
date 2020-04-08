const rfidUser = require("../models/rfid.models");


class RoomService {
    async getUserByID(id) {
        try {
            const user = await rfidUser.find({
                'uid': id
            });
            return user;
        } catch (err) {
            throw Error(`ID ${id} not found`);
        }
    }

   
}


module.exports = new RoomService();