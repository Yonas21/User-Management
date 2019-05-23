const mongoose = require('mongoose');
const express = require('express');

let checkAuth = require('../middleware/check-auth');
let shopController = require('../controllers/shop');

const router = express.Router();

//find all shops
router.get('/', shopController.get_all_shops);

//find each shops
router.get('/:shopId', shopController.get_a_shop);

//create new shop
router.post('/', shopController.create_a_shop);

//delete shop
router.delete('/:shopId', shopController.delete_a_shop);

module.exports = router;
