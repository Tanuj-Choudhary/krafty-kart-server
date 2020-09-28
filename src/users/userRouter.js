// Third Party Imports
const express = require('express');

// Project Imports
const {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('./userController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
} = require('../auth/authController');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);

// Restrict below routes to admin
router.use(protect, restrictTo('admin'));

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
