const express = require('express');
const userController = require('../controller/user.controller')

const routers = express.Router();

routers.post('/login', userController.loginUser);
routers.post('/register', userController.register);

module.exports = routers;