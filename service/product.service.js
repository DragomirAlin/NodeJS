const Product = require("../models/product");
const ProductDto = require("../dto/ProductDto");

class ProductService {
    async getProductByID(id) {
        try {
            const products = await Product.find({
                'camera': id
            });
            products.sort((el1, el2) => el1 < el2 ? 0 : 1);
            const lastProduct = products[0];
            // map to dto 
            const productDto = new ProductDto(lastProduct.camera, lastProduct.temperatura, lastProduct.umiditatea, lastProduct.nivelGaz);
            return productDto;
        } catch (err) {
            throw Error(`ID ${id} not found`);
        }
    }

    async allProducts() {
        const rooms = await Product.find({ id: req.params.id });
        rooms.sort((el1, el2) => el1 < el2 ? 1 : 0);
        if (err) return next(err);
        res.send(rooms);
        return rooms;
    }
}

module.exports = new ProductService();