const express = require('express');
const userController = require('../controller/user.controller')
const productsController = require('../controller/product.controller');
const sellerController = require('../controller/seller.controller')
const salesController = require('../controller/sales.controller');

const { validateJWT } = require('../auth/verifyJWT');

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.get('/login', userController.getUserByEmail);
routers.get('/login/:id', validateJWT, userController.getUserById);
routers.put('/login/:id', validateJWT, userController.putUser);
routers.delete('/login/:id', validateJWT, userController.deleteUser);

routers.post('/register', userController.register);

routers.post('/products', validateJWT, productsController.postProduct);
routers.get('/products', productsController.getProducts);
routers.get('/products/:id', validateJWT, productsController.getProductsById);
routers.put('/products/:id', validateJWT, productsController.putProduct);
routers.delete('/products/:id', validateJWT, productsController.deleteProduct);

routers.get('/sellers', validateJWT, sellerController.sellers);

routers.post('/sales', validateJWT, salesController.postSales);
routers.get('/sales', validateJWT, salesController.getSales);
routers.get('/sales/:id', validateJWT, salesController.getSaleById);
routers.patch('/sales/status/:id', validateJWT, salesController.patchSale);
routers.delete('/sales/:id', validateJWT, salesController.deleteSale);

module.exports = routers;