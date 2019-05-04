const express = require("express");
const mongoose = require("mongoose");

let Product = require('../models/product.model');
let Order = require('../models/order.model');
let checkAuth = require("../middleware/check-auth");
let orderController = require("../controllers/orders");

const router = express.Router();

//find all orders created
router.get("/", checkAuth, orderController.orders_get_all);

//create new order
router.post("/", checkAuth, orderController.orders_create_order);

//find out individual orders//details
router.get("/:orderId", checkAuth, orderController.orders_get_one);

// delete the orders
router.delete("/:orderId", checkAuth, orderController.delete_order);

module.exports = router;
