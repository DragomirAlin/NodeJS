var express = require('express')
var router = express.Router();

var raspi_controller = require('../controllers/rfid.controllers');

router.post('/create', raspi_controller.user_create);
router.delete('/delete/:uid', raspi_controller.user_delete);

module.exports = router;