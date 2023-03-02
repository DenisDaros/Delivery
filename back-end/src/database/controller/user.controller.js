const { login, create, findUsers, findUserById, updateUserById, destroyUser } = require('../services/user.service');

const loginUser = async (req, res, _next) => {
  const { email, password } = req.body;
    const user = await login(email, password);
    return res.status(user.status).json(user.message);
};

const register = async (req, res) => {
  const newUSer = req.body;
  const userCreated = await create(newUSer);
  return res.status(userCreated.status).json(userCreated.message);
};

const getUsers = async (req,res) => {
  const users = await findUsers();

  return res.status(200).json(users);
};

const getUserById = async (req,res) => {
  const { id } = req.params;

  const user = await findUserById(id);

  return res.status(200).json(user);
};

const putUser = async (req,res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateUserById(id, data);
  if(!updated) return res.status(404).json({ message: 'Not found' });

  return res.status(200).json(updated);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const removed = await destroyUser(id);
  if(!removed) return res.status(404).json({ message: 'Not found' });

  return { status: 202, message: removed };
};

const findOne = async (req, res) => {
  const { email } = req.body;
  const logedUser = await find(email);
  return res.status(logedUser.status).json(logedUser.message);
}

module.exports = {
  loginUser,
  register,
  findOne
  getUsers,
  getUserById,
  putUser,
  deleteUser,
};
