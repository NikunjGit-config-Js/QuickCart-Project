const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const upload = multer({ dest: 'uploads/' });

router.get('/create', productController.getCreateProduct);
router.post('/create', upload.single('image'), productController.postCreateProduct);

module.exports = router;
