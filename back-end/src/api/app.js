const express = require('express');
const cors = require('cors');
const routes = require('../database/router');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/images', express.static(`${__dirname}/../images`));
app.use(routes);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
