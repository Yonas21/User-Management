const express = require("express");
const mongoose = require("mongoose");

let checkAuth = require("../middleware/check-auth");
let reivewController = require("../controllers/review");

const router = express.Router();

//find all orders created
router.get("/", reivewController.get_all_reviews);

//create new order
router.post("/", reivewController.create_a_review);

//find out individual orders//details
router.get("/:reviewId", reivewController.get_a_review);

// delete the orders
router.delete("/:reviewId", reivewController.delete_a_review);

module.exports = router;
