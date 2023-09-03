const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsControler");
const { extractProductManager } = require('../middlewares/extractProductManager');

module.exports = (productManager) => {
    //router.use(extractProductManager(productManager));

    router.get("/", (req,res) => productsController.getAllProducts(req, res, productManager));
    router.get("/:id", (req,res) => productsController.getProductById(req, res, productManager));

    return router;
  };