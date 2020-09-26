const Products = require('./productModel');

const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require('../utils/handlerFactory');

const updateProduct = updateOne(Products);
const deleteProduct = deleteOne(Products);
const createProduct = createOne(Products);
const getProduct = getOne(Products);
const getAllProducts = getAll(Products);

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
