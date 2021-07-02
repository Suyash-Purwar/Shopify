const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!err) cart = JSON.parse(fileContent)
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products.find(prod => prod.id === id);
            if (existingProduct) {
                existingProduct.qty += 1;
                cart.products[existingProductIndex] = existingProduct;
            } else {
                cart.products.push({ id: id, qty:1});
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        });
    }

    static deleteProductFromCart(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return;
            const cart = JSON.parse(fileContent);
            let updatedCartProducts = [];
            let updatedTotalPrice;

            const cartProductExists = cart.products.find(p => p.id === id);
            if (!cartProductExists) {
                return;
            }
            cart.products.forEach(p => {
                if (p.id !== id) {
                    updatedCartProducts.push(p);
                } else {
                    updatedTotalPrice = cart.totalPrice - (p.qty * price);
                }
            });

            cart.products = updatedCartProducts;
            cart.totalPrice = updatedTotalPrice;

            console.log(cart)

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, contentFile) => {
            if (err) {
                cb([]);
            } else {
                const cart = JSON.parse(contentFile)
                cb(cart);
            }
        });
    }
}