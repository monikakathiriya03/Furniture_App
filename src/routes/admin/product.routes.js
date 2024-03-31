const express = require("express");
const { upload } = require("../../helpers/imageUpload");
const productRoutes = express.Router();
const { adminVerifyToken } = require("../../helpers/verifyToken");
const {
  addNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../../controller/admin/product.controller");

productRoutes.post(
  "/add-product",
  upload.single("productImage"),
  addNewProduct
);
productRoutes.get("/get-all-products", getAllProducts);
productRoutes.get("/get-product", getProduct);
productRoutes.put(
  "/update-product",
  upload.single("productImage"),
  updateProduct
);
productRoutes.delete("/delete-product", deleteProduct);

module.exports = productRoutes;
