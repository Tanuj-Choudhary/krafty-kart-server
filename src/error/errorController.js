const { sendErrorDev, sendErrorProd } = require('./utils');

const errorController = (err, req, res, next) => {
  if (process.NODE_ENV === 'DEVELOPMENT') {
    sendErrorDev(err, res);
  } else if (process.NODE_ENV === 'PRODUCTION') {
    sendErrorProd(err, res);
  }
};

module.exports = errorController;
