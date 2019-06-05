const express = require("express");
const mongoose = require("mongoose");

let checkAuth = require("../middleware/check-auth");
let reivewController = require("../controllers/review");

const router = express.Router();

//find all orders created
router.get("/", reivewController.get_all_comments);

//create new order
router.post("/", reivewController.create_a_comment);

//find out individual orders//details
router.get("/:commentId", reivewController.get_a_comment);

// delete the orders
router.delete("/:commentId", reivewController.delete_a_comment);

module.exports = router;
