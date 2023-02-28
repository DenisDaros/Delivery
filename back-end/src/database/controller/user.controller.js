const { login } = require('../services/user.service')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await login(email, password)
    return res.status(200).json(user);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  loginUser
}