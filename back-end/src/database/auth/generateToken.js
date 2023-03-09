require('dotenv/config');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const secret = fs.readFileSync(path.resolve(__dirname, "../../../jwt.evaluation.key"), { encoding: "utf-8" })
const generateToken = (userOBj) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(userOBj, secret, jwtConfig);

  return token;
}

module.exports = {
  generateToken,
};