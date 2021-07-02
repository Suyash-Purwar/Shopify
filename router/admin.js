const { Router } = require('express');

const adminController = require('./../controllers/admin');

const router = Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.get('/product-list-admin', adminController.getProductListAdmin);

router.get('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;