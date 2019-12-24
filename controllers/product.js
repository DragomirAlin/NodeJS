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






