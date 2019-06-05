const express = require("express");
const mongoose = require("mongoose");

let commentController = require("../controllers/comment");

const router = express.Router();

//find all orders created
router.get("/", commentController.get_all_comments);

//create new order
router.post("/", commentController.create_a_comment);

//find out individual orders//details
router.get("/:commentId", commentController.get_a_comment);

// delete the orders
router.delete("/:commentId", commentController.delete_a_comment);

module.exports = router;
