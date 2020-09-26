const Products = require('./productModel');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});

    res.status(200).json({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllProducts,
};
