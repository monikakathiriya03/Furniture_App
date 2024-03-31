const ProductServices = require('../../services/product.service');
const productService = new ProductServices();

exports.getAllProducts = async (req, res) => {
    try {
        let products = await productService.getAllProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product){
            return res.status(404).json({ message: 'Product not found...' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};