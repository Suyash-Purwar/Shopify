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
        path: 'cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.redner('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}