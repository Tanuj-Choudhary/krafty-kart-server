/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('./usersModel');
const Review = require('../reviews/reviewModel');

const {
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');
const AppError = require('../error/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });

  return newObj;
};

const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'mobileNumber',
    'pincode'
  );

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

const updateAddress = async (req, res, next) => {
  if (!req.body || !req.body.address || !req.body.pincode) {
    return next(new AppError('Please provide address', 400));
  }

  const address = req.body;

  try {
    await User.update(
      { _id: req.user._id, 'addresses._id': req.params.id },
      {
        $set: {
          'addresses.$.address': address.address,
          'addresses.$.pincode': address.pincode,
        },
      }
    );

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const addAddress = async (req, res, next) => {
  if (!req.body || !req.body.address || !req.body.pincode) {
    return next(new AppError('Please provide address', 400));
  }

  const address = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { addresses: address },
      },
      { new: true, userFindAndModify: false, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: { _id: req.params.id } } },
      { useFindAndModify: false, new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    next(err);
  }
};

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
  updateMe,
  deleteMe,
  addAddress,
  deleteAddress,
  updateAddress,
};
