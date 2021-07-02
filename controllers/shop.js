const Product = require('./../models/product.model');
const Cart = require('./../models/cart.model');

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
    Cart.getCart(cart => {
        if (cart.length <= 0) {
            return res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: []
            });
        }
        Product.fetchAll(products => {
            const cartProducts = [];
            let cartProductData;
            for (product of products) {
                cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProductFromCart(prodId, product.price);
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