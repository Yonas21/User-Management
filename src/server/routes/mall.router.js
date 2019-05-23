const mongoose = require('mongoose');
const express = require('express');

let checkAuth = require('../middleware/check-auth');
let mallController = require('../controllers/mall');

const router = express.Router();

//find all malls
router.get('/', mallController.getMalls);

//find individual malls
router.get('/:mallId', mallController.get_a_mall);

//create new mall
router.post('/', mallController.create_a_mall);

//delete mall
router.delete('/:mallId', mallController.delete_a_mall);

module.exports = router;
