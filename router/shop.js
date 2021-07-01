const { Router } = require('express');

const productsController = require('./../controllers/products');

const router = Router();

router.get('/', productsController.getProducts);

module.exports = router;