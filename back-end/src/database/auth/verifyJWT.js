const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../services/user.service');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'secret_key';

const validateJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) throw new Error('Invalid token or not founded');

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