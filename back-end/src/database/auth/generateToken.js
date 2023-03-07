require('dotenv/config');
const jwt = require('jsonwebtoken');
const secret = require("fs")
  .readFileSync("./jwt.evaluation.key", { encoding: "utf-8" }).trim();

const generateToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email, password }}, secret, jwtConfig);

  return token;
}

module.exports = {
  generateToken,
};