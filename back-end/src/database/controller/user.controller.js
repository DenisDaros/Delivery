const { login, create, find } = require('../services/user.service')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
    const user = await login(email, password)
    return res.status(user.status).json(user.message);
}

const register = async (req, res) => {
  const newUSer = req.body;
  const userCreated = await create(newUSer);
  return res.status(userCreated.status).json(userCreated.message);
}

const findOne = async (req, res) => {
  const { email } = req.body;
  const logedUser = await find(email);
  return res.status(logedUser.status).json(logedUser.message);
}

module.exports = {
  loginUser,
  register,
  findOne
}