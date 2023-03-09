const { login, create, findUserByEmail, findUserById,
   updateUserById, destroyUser } = require('../services/user.service');

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

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  
  const user = await findUserByEmail(email);

  return res.status(user.status).json(user.message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await findUserById(id);

  return res.status(user.status).json(user.message);
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updated = await updateUserById(id, data);
  
  return res.status(updated.status).json(updated.message);
};

const deleteUser = async (req) => {
  const { id } = req.params;

  const removed = await destroyUser(id);
  
  return { status: removed.status, message: removed.message };
};

module.exports = {
  loginUser,
  register,
  getUserByEmail,
  getUserById,
  putUser,
  deleteUser,
};