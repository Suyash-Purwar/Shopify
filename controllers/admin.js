const Product = require('./../models/product.model');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getProductListAdmin = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list-admin', {
            pageTitle: 'Admin Products List',
            path: "/admin/product-list-admin",
            products: products
        });
    });
}