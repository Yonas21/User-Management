const mongoose = require('mongoose');
const express = require('express');

let checkAuth = require('../middleware/check-auth');
let wishlistController = require('../controllers/wishlist');

const router = express.Router();

//find all wishes
router.get('/', checkAuth, wishlistController.get_all_wishes);

//find individual wishes
router.get('/:wishId', checkAuth, wishlistController.get_one_wish);

//create new wishlist
router.post('/', checkAuth, wishlistController.create_wishlist);

//delete wishlist
router.delete('/:wishId', checkAuth, wishlistController.delete_wishlist);

module.exports = router;
