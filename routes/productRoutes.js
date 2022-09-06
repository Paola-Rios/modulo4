const express = require("express")
const productRouter = express.Router();
const productController = require("./../controllers/productController")
//routes
productRouter
    .route("/")
    .get(productController.getAllProducts)
    .post(productController.addProduct);

productRouter
    .route("/:id")
    .get(productController.getProductById);

module.exports = productRouter;