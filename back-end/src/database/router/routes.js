const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.post('/register', userController.register);
routers.get('/products', productController.products);
routers.post('/name', userController.findOne);

module.exports = routers;