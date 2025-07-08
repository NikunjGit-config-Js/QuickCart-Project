const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdmin);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.post('/register', adminController.register); // Admin registration
router.get('/logout', adminController.logout);
router.post('/delete/:id', adminController.deleteProduct); // Delete product

module.exports = router;
