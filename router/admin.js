const { Router } = require('express');

const productsController = require('./../controllers/products');

const router = Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;