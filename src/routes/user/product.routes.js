const express = require("express");
const productRoutes = express.Router();
const { userVerifyToken } = require("../../helpers/verifyToken");
const {
  getAllProducts,
  getProduct,
} = require("../../controller/user/product.controller");

productRoutes.get("/get-all-products", getAllProducts);
productRoutes.get("/get-product", getProduct);

module.exports = productRoutes;
