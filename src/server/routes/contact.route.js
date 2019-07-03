const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.get('/',contactController.get_all_contact_infos);

router.post('/',contactController.contact_us);

router.delete('/:id', contactController.delete_contact);

module.exports  = router;
