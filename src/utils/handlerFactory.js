const AppError = require('../error/appError');

const updateOne = (Model) => async (req, res, next) => {
  try {
    const product = await Model.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteOne = (Model) => async (req, res, next) => {
  try {
    const product = await Model.findByIdAndDelete(req.params.id, {
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

const createOne = (Model) => async (req, res, next) => {
  try {
    const product = await Model.create(req.body);

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

const getOne = (Model) => async (req, res, next) => {
  try {
    const product = await Model.findById(req.params.id);

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

const getAll = (Model) => async (req, res, next) => {
  try {
    const products = await Model.find({});

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
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
};
