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

const create = async (newUser) => {
  const { name, email, password } = newUser;
  const codPass = md5(password);
  const user = await User.findOne({ where: { name, email } })

  if (user) return { status: 409, message: 'invalid fild' }

  const createNewUser = await User.create({ email, name, password: codPass });
  const { password: _password, ...userWithoutPassword } = createNewUser.dataValues;
  const token = generateToken(userWithoutPassword)
  return { status: 201, message: token };
}

const find = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { status: 400, message: 'error' };
  return { status: 200, message: user.name };
}

module.exports = {
  login,
  create,
  find
}