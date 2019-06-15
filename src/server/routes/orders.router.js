const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
let checkAuth = require("../middleware/check-auth");
let orderController = require("../controllers/orders");

const router = express.Router();

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
    limits: 1024 * 1024 * 20,
    fileFilter: imageFilter
});
//find all orders created
router.get("/", orderController.orders_get_all);

//create new order
router.post("/", upload.single("productImage") , orderController.orders_create_order);

//find out individual orders//details
router.get("/:orderId", orderController.orders_get_one);

// delete the orders
router.delete("/:orderId", orderController.delete_order);

module.exports = router;
