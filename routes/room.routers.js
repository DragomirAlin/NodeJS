var express = require('express');
var router = express.Router();

var room_controller = require('../controllers/room.controllers');

router.post('/create', room_controller.room_create);
router.put('/:id/update', room_controller.room_update);
router.delete('/:id/delete', room_controller.room_delete);
router.get('/:id', room_controller.roomById);
router.get('/1/ON', room_controller.room_1_on);
router.get('/1/OFF', room_controller.room_1_off);
router.get('/2/ON', room_controller.room_2_on);
router.get('/2/OFF', room_controller.room_2_off);
router.get('/3/ON', room_controller.room_3_on);
router.get('/3/OFF', room_controller.room_3_off);
router.get('/AIR/ON', room_controller.room_air_on);
router.get('/AIR/OFF', room_controller.room_air_off);
router.get('/CPU/B', room_controller.rpi_cpu);
router.get('/OS/P', room_controller.rpi_os_p);
router.get('/OS/H', room_controller.rpi_os_h);



  

module.exports = router;