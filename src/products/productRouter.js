// Third Party Imports
const express = require('express');

// Project Imports
const {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  aliasNewArrivals,
} = require('./productController');

const { getReviewProduct } = require('../reviews/reviewController');

const router = express.Router();

router.route('/:id/reviews').get(getReviewProduct);

router.route('/newarrivals').get(aliasNewArrivals);
router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
