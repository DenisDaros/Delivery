const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');
const salesController = require('../controller/sales.controller');

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.post('/register', userController.register);
routers.get('/products', productController.products);
routers.post('/customers/order', salesController.postSales);
routers.get('/customers/order', salesController.getSales);
routers.get('/customers/order/:id', salesController.getSaleById);
routers.patch('/customers/order/status/:id', salesController.patchSale);
routers.delete('/customers/order/:id', salesController.deleteSale);


module.exports = routers;