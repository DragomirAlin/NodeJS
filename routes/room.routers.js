var express = require('express');
var router = express.Router();

var room_controller = require('../controllers/room.controllers'); 

// Metodă POST pentru a crea documente de test în DB 
router.post('/create', room_controller.room_create);

// Metodă PUT pentru a face update unui document existent
router.put('/:id/update', room_controller.room_update);

// Metodă DELETE pentru ștergerea unui document
router.delete('/:id/delete', room_controller.room_delete);

// Metodă GET pentru afișarea ultimului document din DB pe baza id-ului 
router.get('/:id', room_controller.roomById);

// Metode GET pentru controlul modulului - Aprindere/Oprire LED-uri și ventilator
router.get('/1/ON', room_controller.room_1_on);
router.get('/1/OFF', room_controller.room_1_off);
router.get('/2/ON', room_controller.room_2_on);
router.get('/2/OFF', room_controller.room_2_off);
router.get('/3/ON', room_controller.room_3_on);
router.get('/3/OFF', room_controller.room_3_off);
router.get('/AIR/ON', room_controller.room_air_on);
router.get('/AIR/OFF', room_controller.room_air_off);

module.exports = router;