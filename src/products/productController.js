const Products = require('./productModel');

const getAllProducts = async (req, res, next) => {
  const products = await Products.find({});

  res.status(200).json({
    status: 'success',
    products,
  });
};

module.exports = {
  getAllProducts,
};
