const { login, create } = require('../services/user.service')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
    const user = await login(email, password)
    return res.status(user.status).json(user.message);
}

const register = async (req, res) => {
  const newUSer = req.body;
  console.log(newUSer)
  const userCreated = await create(newUSer);
  return res.status(userCreated.status).json(userCreated.message);
}

module.exports = {
  loginUser,
  register
}