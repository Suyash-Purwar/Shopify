const { Router } = require('express');

const adminController = require('./../controllers/admin');

const router = Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/product-list-admin', adminController.getProductListAdmin);

module.exports = router;