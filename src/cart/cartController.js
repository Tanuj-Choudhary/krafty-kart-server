const Product = require('../products/productModel');

const addProductTocart = async (req, res, next) => {
  try {
    await Product.findById(req.params.id);

    req.user.cart.products.push(req.params.id);
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    await Product.findById(req.params.id);

    req.user.cart.products.remove(req.params.id);
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addProductTocart, deleteProductFromCart };
