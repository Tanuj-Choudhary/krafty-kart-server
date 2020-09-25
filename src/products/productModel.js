const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    reqiured: [true, 'Product name is required'],
    unique: true,
  },
  brand: {
    type: String,
    reqiured: [true, 'Brand name is required'],
  },
  price: {
    type: String,
    reqiured: [true, 'Product price is required'],
  },
  dialShape: {
    type: String,
    enum: ['round', 'square', 'rectangle'],
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'X', 'XL'],
  },
  category: {
    type: String,
  },
  dateCreated: {
    type: Number,
    default: Date.now(),
  },

  color: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
