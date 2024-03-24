const adminsRoutes = require("express").Router();

productRoutes = require("../../routes/admin/product.routes");
adminsRoutes.use('/products', productRoutes);

module.exports = adminsRoutes;