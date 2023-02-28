const { User } = require('../models')

const findUser = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  findUser
}