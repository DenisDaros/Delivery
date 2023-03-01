const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.get('/products', productController.products);

module.exports = routers;