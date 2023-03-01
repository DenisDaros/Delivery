const express = require('express');
const cors = require('cors');
const routers = require('../database/router');

const app = express();
app.use(cors());

app.use(express.json());
app.use(routers);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
