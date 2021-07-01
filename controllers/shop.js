const Product = require('./../models/product.model');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            path: "/products",
            products: products
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shopify',
            path: "/",
            products: products
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        // res.render('shop/cart');
        console.log(product);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.redner('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}