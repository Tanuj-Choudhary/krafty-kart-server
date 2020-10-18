const User = require('./usersModel');
const Review = require('../reviews/reviewModel');

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

const getReviewUser = async (req, res, next) => {
  try {
    const { user } = req;
    const reviews = await Review.find({ user }).populate({
      path: 'product',
      select: 'name price',
    });

    res.status(200).json({
      status: 'success',
      data: {
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
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
  getReviewUser,
};
