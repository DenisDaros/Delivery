const express = require('express');
const userRoutes = require('./routes');

const router = express.Router();

router.use('/', userRoutes);

module.exports = router;