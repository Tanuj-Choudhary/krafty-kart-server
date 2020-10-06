const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
