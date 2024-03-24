const express = require('express');
const productRoutes = express.Router();
// const {verifyToken} = require('../../helpers/verifyToken');
const {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
    
} = require('../../controller/admin/product.controller');

productRoutes.post('/add-product', addNewProduct);
productRoutes.get('/get-all-products', getAllProducts);
productRoutes.get('/get-product', getProduct);
productRoutes.put('/update-product', updateProduct);
productRoutes.delete('/delete-product', deleteProduct);

module.exports = productRoutes;
