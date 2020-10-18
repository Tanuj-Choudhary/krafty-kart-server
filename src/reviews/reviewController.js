const Reviews = require('./reviewModel');

const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');
const Product = require('../products/productModel');
const Review = require('./reviewModel');

const getReviewProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const reviews = await Review.find({ product });

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
  getReviewProduct,
};
