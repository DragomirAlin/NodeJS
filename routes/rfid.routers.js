var express = require('express')
var router = express.Router();

var raspi_controller = require('../controllers/rfid.controllers');

router.post('/create', raspi_controller.user_create);
router.delete('/delete/:uid', raspi_controller.user_delete);
router.get('/allUser', raspi_controller.view_all_user);
router.get('/allLogs', raspi_controller.view_all_logs);
router.get('/logs/:nume', raspi_controller.search_logs_nume);

module.exports = router;