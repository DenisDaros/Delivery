const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');
const salesController = require('../controller/sales.controller');

const routers = express.Router();

routers.post('/login', userController.loginUser);

routers.post('/register', userController.register);

routers.get('/products', productController.products);

routers.post('/sales', salesController.postSales);
routers.get('/sales', salesController.getSales);
routers.get('/sales/:id', salesController.getSaleById);
routers.patch('/sales/status/:id', salesController.patchSale);
routers.delete('/sales/:id', salesController.deleteSale);


module.exports = routers;