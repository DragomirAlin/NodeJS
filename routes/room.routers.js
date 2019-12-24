var express = require('express');
var router = express.Router();

var room_controller = require('../controllers/room.controllers');

router.post('/create', room_controller.room_create);
router.put('/:id/update', room_controller.room_update);
router.delete('/:id/delete', room_controller.room_delete);
router.get('/:id', room_controller.roomById);

module.exports = router;