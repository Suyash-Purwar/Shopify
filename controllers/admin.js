const Product = require('./../models/product.model');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const editMode = Boolean(req.query.edit);

    if (!editMode) return res.redirect('/');

    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    delete req.body.id;
    Product.editProduct(req.body.productId, req.body, () => {
        res.redirect('/admin/product-list-admin');
    });
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

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteProduct(prodId, () => {
        res.redirect('/admin/product-list-admin')
    });
}