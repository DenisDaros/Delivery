const { User } = require('../models')
const { generateToken } = require('../auth/token.generate')
const md5 = require('md5');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return { status: 404, message: "Not found" }

  const DBPassword = user.dataValues.password;
  const HashPassword = md5(password)

  if (HashPassword !== DBPassword) return { status: 401, message: "Icorrect" }

  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = generateToken(userWithoutPassword)
  return { status: 200, message: token };
};

module.exports = {
  login
}