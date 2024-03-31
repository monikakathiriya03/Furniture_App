const ProductServices = require('../../services/product.service');
const productService = new ProductServices();

exports.addNewProduct = async (req, res) => {
    try{
        let product = await productService.getProduct({title: req.body.title, isDelete: false});
        // console.log(product);
        if(product) {
            return res.status(400).json({message: 'Product is already exist...'});
        }
        if(req.file){
            req.body.productImage = req.file.path.replace(/\\/g, '/')
        }
        
        product = await productService.addNewProduct({...req.body});
        res.status(201).json({product: product, message: 'New Product Added Successfully...✅'});
}
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        let products = await productService.getAllProducts(req.query);
        console.log(products);
        res.status(200).json(products);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.getProduct = async (req, res) => {
    try{
        let productId = req.query.productId;
        let product = await productService.getProductById(productId);
        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }
        res.status(200).json(product);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
    
};

exports.updateProduct = async (req, res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }
        if(req.file){
            req.body.productImage = req.file.path.replace(/\\/g, '/')
        }
        product = await productService.updateProduct(product._id,{ ...req.body});
        res.status(200).json({product,message: 'Product Updated Successfully...✅'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }
        product = await productService.updateProduct(product._id,{isDelete: true});
        res.status(200).json({product,message: 'Product Deleted Successfully...✅'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};