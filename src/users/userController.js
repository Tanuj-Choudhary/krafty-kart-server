const User = require('./usersModel');

const {
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

const deleteUser = deleteOne(User);
const getUser = getOne(User);
const getAllUser = getAll(User);

// Do not update passwords with these
const updateUser = updateOne(User);

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
};
