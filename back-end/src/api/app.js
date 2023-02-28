const express = require('express');
const router = require('../database/router');

const app = express();

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/', (_request, response) => {
  response.send();
});

app.use(router.userRouter);

module.exports = app;
