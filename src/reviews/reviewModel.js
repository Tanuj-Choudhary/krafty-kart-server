const mongoose = require('mongoose');
const Product = require('../products/productModel');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, 'A review can not be empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Rating should be in 1-5'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

    required: [true, 'A review must belong to a user'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'A review must belong to a product'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'firstName lastName' });
  next();
});

// Calculate avg rating and save to tour
reviewSchema.statics.calcAvgRatings = async function (productID) {
  // Get number of rating and average rating
  const stats = await this.aggregate([
    {
      $match: {
        product: productID,
      },
    },
    {
      $group: {
        _id: '$product',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  const { _id, nRatings, avgRating } = stats[0];

  // Get product
  const product = await Product.findById(_id);

  // Assign and save
  if (product) {
    product.nRatings = nRatings;
    product.avgRating = avgRating;

    await product.save();
  }
};

// Calculate rating whenever a new review is created
reviewSchema.post('save', function () {
  this.constructor.calcAvgRatings(this.product);
});

/**
 * Calculate rating whenever a  review is deleted or updated
 * Run on findOneAndUpdate and findOneAndDelete
 * on pre middleware get review from query and attach to this (On post hooks it will be already deleted)
 * After deleting calculate avg ratings
 */
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/findOneAnd/, async function () {
  this.r.constructor.calcAvgRatings(this.r.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
