const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");
const productController = require("../controllers/product");

let router = express.Router();

//filter the kinds of images to be stored.
const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 10,
    fileFilter: imageFilter
});

//get all the products
router.get("/", productController.get_all_products);
//add a product
router.post(
    "/",
    upload.single("productImage"),
    productController.create_product
);
//find the individual products
router.get("/:productId", productController.get_one_product);

//update the individual products
router.patch("/:productId", productController.update_product);

//update the individual products
router.delete("/:productId", productController.delete_product);

module.exports = router;
