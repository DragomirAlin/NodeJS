var Product = require('../models/product');
const productService = require("../service/product.service");



exports.product_create = function (req, res) {
    var product = new Product(
        {
            camera: req.body.camera,
            temperatura: req.body.temperatura,
            umiditatea: req.body.umiditatea,
            nivelGaz: req.body.nivelGaz
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// exports.product_room = async function (req, res) {
//     const rooms = await Product.find({ id: req.params.id });
//     rooms.sort((el1, el2) => el1 < el2 ? 1 : 0);
//     if (err) return next(err);
//     res.send(rooms);
//     // res.send(rooms[0].temperatura);

// };

// exports.product_room = async function (req, res){
//     var id = req.params.id;
//     Product.find({
//         'camera': id
//     },   function(err, result) {
//         if (err) throw err;
//         if (result) {
//             result.sort((el1, el2) => el1 < el2 ? 1 : 0);
//             // res.json(result[0].nivelGaz)
//             res.json(result[0])
//         } else {
//             res.send(JSON.stringify({
//                 error : 'Error'
//             }))
//         }
//     })
// }


exports.productById = async (request, response, next) => {
    const productId = request.params.id;
    productService
      .getProductByID(productId)
      .then(product => response.send(product))
      .catch(err => {
        console.log("here");
        next(err);
      });
  };

// exports.product_temp = async function (req, res){
//     var idtemp = req.params.idtemp;
//     Product.find({
//         'camera': idtemp
//     },   function(err, result) {
//         if (err) throw err;
//         if (result) {
//             result.sort((el1, el2) => el1 < el2 ? 1 : 0);
//             // res.json(result[0].nivelGaz)
//             res.json(result[0].temperatura)
//         } else {
//             res.send(JSON.stringify({
//                 error : 'Error'
//             }))
//         }
//     })
// }

// exports.product_umid = async function (req, res){
//     var idumid = req.params.idumid;
//     Product.find({
//         'camera': idumid
//     },   function(err, result) {
//         if (err) throw err;
//         if (result) {
//             result.sort((el1, el2) => el1 < el2 ? 1 : 0);
//             // res.json(result[0].nivelGaz)
//             res.json(result[0].umiditatea)
//         } else {
//             res.send(JSON.stringify({
//                 error : 'Error'
//             }))
//         }
//     })
// }



// exports.product_room = function (req, res){
//     Product.findById(req.params.room, function (err, product) {
//         if (err) return next(err);
//         res.json(product); Product.sortBy get[0].temp

//     })
// };

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};






