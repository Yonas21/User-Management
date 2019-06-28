const sellsController = require('../controllers/countSells');
const express = require('express');
const router = express.Router();

router.post('/:productId',sellsController.count_sells);

module.exports = router;
