const { findUserByEmail } = require('../services/user.service');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

require('dotenv/config');

const secret = fs.readFileSync(path.resolve(__dirname, "../../../jwt.evaluation.key"), { encoding: "utf-8" });

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: 'No credentials sent!' });

    const payload = jwt.verify(token, secret);

    const email = payload.email;

    const user = await findUserByEmail(email);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  };
};

module.exports = {
  validateJWT,
};