var express = require('express');
var router = express.Router();

var raspi_controller = require('../controllers/raspi.controllers');

router.get('/OS', raspi_controller.operating_system);
router.get('/NET', raspi_controller.network_test);
router.get('/FS', raspi_controller.file_system);
router.get('/PL', raspi_controller.process_load);
router.get('/MEM', raspi_controller.memory);
router.get('/CPU', raspi_controller.cpu);
router.get('/Docker', raspi_controller.docker );
router.get('/netCon', raspi_controller.network_connection)




  

module.exports = router;