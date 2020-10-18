// Third Party Imports
const express = require('express');

// Project Imports
const {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getReviewUser,
} = require('./userController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
  isSignedIn,
} = require('../auth/authController');

const router = express.Router();

router.route('/reviews').get(protect, getReviewUser);

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);

router.route('/isSignedIn').get(protect, isSignedIn);

// Restrict below routes to admin
router.use(protect, restrictTo('admin'));

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
