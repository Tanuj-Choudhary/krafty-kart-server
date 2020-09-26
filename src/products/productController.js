const Products = require('./productModel');
const AppError = require('../error/appError');

const updateProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!product) {
      return next(new AppError('No product found with that ID', 401));
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    });

    if (!product) {
      return next(new AppError('No product found with that ID', 401));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Products.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return next(new AppError('No product found with that id', 401));
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

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
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
