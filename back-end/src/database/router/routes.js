const express = require('express');
const userController = require('../controller/user.controller')
const productController = require('../controller/product.controller');
const salesController = require('../controller/sales.controller');
const sellerController = require('../controller/seller.controller');

const { validateJWT } = require('../auth/verifyJWT');

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.get('/login', validateJWT, userController.getUsers);
routers.get('/login/:id', validateJWT, userController.getUserById);
routers.put('/login/:id', validateJWT, userController.putUser);
routers.delete('/login/:id', validateJWT, userController.deleteUser);

routers.post('/register', userController.register);

routers.get('/products', validateJWT, productController.getProducts);
routers.get('/products/:id', validateJWT, productController.getProductsById);
routers.post('/products', validateJWT, productController.postProduct);
routers.put('/products/:id', validateJWT, productController.putProduct);
routers.delete('/products/:id', validateJWT, productController.deleteProduct);


routers.get('/sellers', validateJWT, sellerController.sellers);

routers.post('/sales', validateJWT, salesController.postSales);
routers.get('/sales', validateJWT, salesController.getSales);
routers.get('/sales/:id', validateJWT, salesController.getSaleById);
routers.patch('/sales/status/:id', validateJWT, salesController.patchSale);
routers.delete('/sales/:id', validateJWT, salesController.deleteSale);

module.exports = routers;