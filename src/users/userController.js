const User = require('./usersModel');

const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');

const createUser = createOne(User);
const deleteUser = deleteOne(User);
const updateUser = updateOne(User);
const getUser = getOne(User);
const getAllUser = getAll(User);

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
};
