const { login } = require('../services/user.service')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
    const user = await login(email, password)
    return res.status(user.status).json(user.message);
}

module.exports = {
  loginUser
}