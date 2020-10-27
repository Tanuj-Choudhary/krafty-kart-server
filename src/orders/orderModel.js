const mongoose = require('mongoose');
const User = require('../users/usersModel');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, 'A order belongs to a user'],
  },
  cart: {
    type: Object,
    required: [true, 'A order must contain a cart'],
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  address: {
    type: {
      type: String,
      enum: ['home', 'work'],
      required: [true, 'Address type is required'],
    },
    name: String,
    mobileNumber: Number,
    address: String,
    pincode: Number,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
