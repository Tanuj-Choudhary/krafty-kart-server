const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Trusted Error send error message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      err: err,
    });
  }

  /**
   * Non trusted or unhandled error
   * Do not send or leak error data
   * Log error
   * Send a generic error message
   */

  console.log(err);

  res.status(500).json({
    status: 'Fail',
    message: 'Something went wrong',
  });
};

module.exports = {
  sendErrorDev,
  sendErrorProd,
};
