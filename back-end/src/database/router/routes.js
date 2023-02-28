const express = require('express');
const userController = require('../controller/user.controller')

const routers = express.Router();

routers.post('/login', userController.loginUser);

module.exports = routers;