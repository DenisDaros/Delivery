const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../services/user.service');

require('dotenv/config');

const secret = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" }).trim();

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: 'No credentials sent!' });

    const decoded = jwt.verify(token, secret);

    const { email } = decoded.data.email;

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