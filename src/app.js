// Third Party Imports
const express = require('express');
const morgan = require('morgan');

// Project Imports
const globalErrorHandler = require('./error/errorController');
const productRouter = require('./products/productRouter');
const AppError = require('./error/appError');

const app = express();

// MIDDLEWARES

// SEE API REQUEST
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

//  Body parser
app.use(express.json());

// Routes
app.use('/api/v1/products', productRouter);

app.use(globalErrorHandler);

module.exports = app;
