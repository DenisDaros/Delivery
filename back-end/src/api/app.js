const express = require('express');
const router = require('../database/router');
const cors = require('cors')
const { loginUser } = require('../database/controller/user.controller');

const app = express();
app.use(cors())

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/', loginUser)

app.use(router.userRouter);

module.exports = app;
