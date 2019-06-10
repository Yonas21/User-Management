const express = require("express");
const mongoose = require("mongoose");

let checkAuth = require("../middleware/check-auth");
let orderController = require("../controllers/orders");

const router = express.Router();

//find all orders created
router.get("/", orderController.orders_get_all);

//create new order
router.post("/", orderController.orders_create_order);

//find out individual orders//details
router.get("/:orderId", orderController.orders_get_one);

// delete the orders
router.delete("/:orderId", orderController.delete_order);

module.exports = router;
