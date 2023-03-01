const express = require('express');
const userRouter = require('./routes');

const router = express.Router();

router.use('/',userRouter)

module.exports = router;