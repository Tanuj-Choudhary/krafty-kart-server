const Products = require('./productModel');
const AppError = require('../error/appError');

const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Please provide the ID', 401));
  }

  try {
    const product = await Products.findByIdAndUpdate(id, req.body, {
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
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Please provide the ID', 401));
  }

  try {
    const product = await Products.findByIdAndDelete(id, {
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
    if (!req.body) {
      return next(new AppError('Please provide a product', 401));
    }

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
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Please provide the ID', 401));
  }

  try {
    const product = await Products.findById(id);

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
