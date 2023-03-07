
const { User } = require('../models');
const { generateToken } = require('../auth/generateToken');
const md5 = require('md5');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return { status: 404, message: "Not found" };

  const DBPassword = user.dataValues.password;
  const HashPassword = md5(password);

  if (HashPassword !== DBPassword) return { status: 401, message: "Incorrect password" };

  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = generateToken(userWithoutPassword);
  return { 
    status: 200, 
    message: { name: user.name, 
    email: user.email,
    role: user.role, 
    token: token
  } };
};

const create = async (newUser) => {
  const { name, email, password, role } = newUser;
  const codPass = md5(password);
  const user = await User.findOne({ where: { name, email } });

  if (!user) return { status: 409, message: 'Invalid Fields' };

  const createNewUser = await User.create({ email, name, password: codPass, role });
  const { password: _password, ...userWithoutPassword } = createNewUser.dataValues;
  const token = generateToken(userWithoutPassword);

  return { status: 201, message: token };
}

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email }, exclude: ['password'] });
  if (!user) return { status: 400, message: 'Error' };

  return { status: 200, message: user.name };
};

const findUserById = async (id) => {
  const user = await User.findById(
    {
      where: { id },
      attributes: { exclude: ['password'] }
    });

  if (!user) return { status: 404, message: "Not found" };

  return { status: 201, message: user };
};

const updateUserById = async (id, data) => {
  await User.update(data, { where: { id } });

  const updated = await findUserById(+id);
  if(!updated) return res.status(404).json({ message: 'Not found' });
  
  return { status: 200, message: updated };
};

const destroyUser = async (id) => {
  const removed = await User.destroy({ where: { id } });
  if(!removed) return res.status(404).json({ message: 'Not found' });
  
  return { status: 202, message: removed };
};

module.exports = {
  login,
  create,
  findUserByEmail,
  findUserById,
  updateUserById,
  destroyUser,
};
