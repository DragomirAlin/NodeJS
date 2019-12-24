var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/product');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', product_controller.test);


router.post('/create', product_controller.product_create);

// router.get('/:id', product_controller.product_room);

// router.get('/:idtemp', product_controller.product_temp);

// router.get('/:idumid', product_controller.product_umid);

// router.get('/:idgaz', product_controller.product_gaz);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);

//router.get('/:room', product_controller.product_room);

 router.get('/:id', product_controller.productById);



module.exports = router;