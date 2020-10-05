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

const router = express.Router();

router.route('/newarrivals').get(aliasNewArrivals);

router.route('/').get(getAllProducts).post(createProduct);

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
