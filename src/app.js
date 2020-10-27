// Third Party Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Project Imports
const globalErrorHandler = require('./error/errorController');
const productRouter = require('./products/productRouter');
const userRouter = require('./users/userRouter');
const reviewRouter = require('./reviews/reviewRouter');
const orderRouter = require('./orders/orderRouter');
const AppError = require('./error/appError');

const app = express();

// MIDDLEWARES
app.use(cors());

// SEE API REQUEST
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

//  Body parser
app.use(express.json());

// Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
