const { findUser } = require('../services/user.service')

const find = async (_req, res) => {
  const findAll = await findUser();
  return res.status(200).json(findAll);
}

module.exports = {
  find
}