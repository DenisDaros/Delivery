const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');
const sellerController = require('../controller/seller.controller')

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.post('/register', userController.register);
routers.get('/products', productController.products);
routers.get('/sellers', sellerController.sellers);

module.exports = routers;