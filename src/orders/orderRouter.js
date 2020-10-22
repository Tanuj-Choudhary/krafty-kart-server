// Third Party Imports
const express = require('express');
const { protect, restrictTo } = require('../auth/authController');

// Project Imports
const {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder,
} = require('./orderController');

const router = express.Router();

router.use(protect, restrictTo('admin'));
router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
