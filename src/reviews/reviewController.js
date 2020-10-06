const Reviews = require('./reviewModel');

const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');

const updateReview = updateOne(Reviews);
const deleteReview = deleteOne(Reviews);
const createReview = createOne(Reviews);
const getReview = getOne(Reviews);
const getAllReviews = getAll(Reviews);

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
