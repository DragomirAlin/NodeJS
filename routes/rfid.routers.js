var express = require('express')
var router = express.Router();

var raspi_controller = require('../controllers/rfid.controllers');

// Metodă POST pentru teste
router.post('/create', raspi_controller.user_create);

// Metodă DELETE pentru ștergerea unui utilizator
router.delete('/delete/:uid', raspi_controller.user_delete);

// Metodă GET pentru afișarea utilizatorilor
router.get('/allUser', raspi_controller.view_all_user);

// Metodă GET pentru afișarea logurilor
router.get('/allLogs', raspi_controller.view_all_logs);

// Metodă GET pentru căutarea unui log după nume
router.get('/logs/:nume', raspi_controller.search_logs_nume);

module.exports = router;