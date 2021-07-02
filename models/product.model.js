const fs = require('fs');
const path = require('path');

const Cart = require('./../models/cart.model');

const products = [];
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) cb([]);
        else cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });

        // fs.readFile(p, (err, fileContent) => {
        //     if (err) {
        //         cb([]);
        //     } else {
        //         const product = JSON.parse(fileContent).find(p => p.id === id)
        //         cb(product);
        //     }
        // });
    }

    static editProduct(id, updatedData, cb) {
        getProductsFromFile(products => {    
            const indexOfToBeUpdatedProd = products.findIndex(p => p.id == id);
            products[indexOfToBeUpdatedProd] = { id:id, ...updatedData }

            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
                cb();
            });
        });
    }

    static deleteProduct(id, cb) {
        getProductsFromFile(products => {
            let updatedProductList = [];
            let priceOfDeletedProduct;

            products.forEach(p => {
                if (p.id !== id) {
                    updatedProductList.push(p)
                } else {
                    console.log(p.price)
                    priceOfDeletedProduct = p.price;
                }
            })

            fs.writeFile(p, JSON.stringify(updatedProductList), err => {
                if (!err) {
                    console.log('something')
                    Cart.deleteProductFromCart(id, priceOfDeletedProduct);
                    console.log(err);
                    cb();
                }
            });
        });
    }
}
