const Orders = require('./orderModel');

const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');
const Order = require('./orderModel');
const User = require('../users/usersModel');
const AppError = require('../error/appError');

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createOrderUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.cart || user.cart.products.length <= 0) {
      return next(new AppError('Cant place order of 0 products', 400));
    }

    const { cart } = user;

    const order = await Order.create({
      cart,
      user: req.user._id,
      address: req.body,
    });

    res.status(200).json({
      status: 'success',
      order,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrder = updateOne(Orders);
const deleteOrder = deleteOne(Orders);
const createOrder = createOne(Orders);
const getOrder = getOne(Orders, 'reviews');
const getAllOrders = getAll(Orders);

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  createOrderUser,
  getMyOrders,
};
