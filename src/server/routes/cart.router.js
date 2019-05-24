const express = require('express');

let cartRouter = require('../controllers/cart');

let checkAuth = require('../middleware/check-auth');

let router = express.Router();

router.get('/', checkAuth, cartRouter.get_all_products_in_cart);

router.post('/:productId', checkAuth, cartRouter.add_item_to_cart);

router.get('/:cartId', checkAuth, cartRouter.get_one_cart_product);

router.delete('/:cartId', checkAuth, cartRouter.delete_item_from_cart);

module.exports = router;
