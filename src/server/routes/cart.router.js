const express = require('express');

let cartRouter = require('../controllers/cart');

// let checkAuth = require('../middleware/check-auth');

let router = express.Router();

router.get('/', cartRouter.get_all_products_in_cart);

router.post('/:productId', cartRouter.add_item_to_cart);

router.get('/:cartId', cartRouter.get_one_cart_product);

router.delete('/:cartId', cartRouter.delete_item_from_cart);

module.exports = router;
