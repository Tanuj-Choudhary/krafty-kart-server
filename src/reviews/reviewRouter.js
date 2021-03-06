// Third Party Imports
const express = require('express');
const { protect, restrictTo } = require('../auth/authController');

// Project Imports
const {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  createReview,
} = require('./reviewController');

const router = express.Router();

router.use(protect, restrictTo('admin'));
router.route('/').get(getAllReviews).post(createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
