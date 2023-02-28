const { User } = require('../models')
const { generateToken } = require('../auth/token.generate')
const md5 = require('md5');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  console.log(user)

  if (!user) throw ({ status: 404, message: "Not found" })

  const DBPassword = user.dataValues.password;
  const HashPassword = md5(password)

  if (HashPassword !== DBPassword) throw ({ status: 401, message: "Icorrect" })

  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = generateToken(userWithoutPassword)
  return { status: 200 };
};

module.exports = {
  login
}