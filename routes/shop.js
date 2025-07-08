const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);
router.get('/shop', shopController.getShop);

module.exports = router;
