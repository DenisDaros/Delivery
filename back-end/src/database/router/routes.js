const express = require('express');
const userController = require('../controller/user.controller')

const routers = express.Router();

routers.get('/user', userController.find);

module.exports = routers;