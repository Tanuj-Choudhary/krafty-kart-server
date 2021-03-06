const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  dialShape: {
    type: String,
    enum: ['round', 'square', 'rectangle'],
  },
  sizes: {
    type: [String],
    validate: {
      validator: function (v) {
        // Enum values
        const enums = ['S', 'M', 'L', 'X', 'XL', 'XXL'];

        let flag = false;

        // Check sizes only contain above enum values
        v.every((providedValue) => {
          flag = false;

          enums.forEach((enumValue) => {
            if (providedValue === enumValue) flag = true;
          });

          return flag;
        });

        return flag;
      },
    },
  },
  avgRating: {
    type: Number,
    default: 4,
    min: 1,
    max: 5,
    required: [true, 'Avg rating should be in 1-5'],
  },
  nRatings: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: [true, 'Product image url is required'],
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  alt: {
    type: String,
    default: 'watch image',
  },
  color: String,
});

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
