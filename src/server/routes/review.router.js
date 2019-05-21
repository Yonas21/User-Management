const express = require("express");
const mongoose = require("mongoose");

let checkAuth = require("../middleware/check-auth");
let reivewController = require("../controllers/review");

const router = express.Router();

//find all orders created
router.get("/", checkAuth, reivewController.get_all_comments);

//create new order
router.post("/", checkAuth, reivewController.create_a_comment);

//find out individual orders//details
router.get("/:orderId", checkAuth, reivewController.get_a_comment);

// delete the orders
router.delete("/:orderId", checkAuth, reivewController.delete_a_comment);

module.exports = router;
