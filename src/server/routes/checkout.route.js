const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout");
router.get("/", checkoutController.get_all_checkout_info);

router.post("/:checkoutId", checkoutController.add_checkout_info);

router.delete("/:checkoutId", checkoutController.delete_checkout_info);

module.exports = router;
