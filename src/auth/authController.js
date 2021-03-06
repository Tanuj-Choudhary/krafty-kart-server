// Third Party Imports
const jwt = require('jsonwebtoken');

// Project Imports
const AppError = require('../error/appError');
const User = require('../users/usersModel');
const nodeMailer = require('../utils/nodeMailer');

async function verifyJWT(token) {
  return await jwt.verify(token, process.env.JWT_SECRET_KEY);
}

const signup = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      address: req.body.address,
      pincode: req.body.pincode,
      mobileNumber: req.body.mobileNumber,
    };

    const newUser = await User.create(user);

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError('Please provide email and password', 401));
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = await user.generateJWT(user._id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get token
 * Verify it
 * Check if user still exist
 * Attach user to request object
 */
const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('Please send the token', 401));
  }

  // Bearer 23423 = 23423
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await verifyJWT(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('The user does not exists', 401));
    }

    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};

const isSignedIn = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide email', 400));
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return next(new AppError('No user exist with that email', 400));
    }

    const token = await user.generatePasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const message = `The OTP for password reset: ${token}`;

    const mailOptions = {
      from: 'process.env.OAUTH_EMAIL',
      to: email,
      subject: 'Reset Password',
      text: message,
    };

    nodeMailer.sendMail(mailOptions, () => {});

    res.status(200).json({
      status: 'success',
      data: {
        message:
          'The password OTP is sent to your email. Please check your inbox',
      },
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { passwordResetToken, email, password, passwordConfirm } = req.body;

  if (!passwordResetToken || !password || !passwordConfirm || !email) {
    return next(new AppError('Please provide all details', 401));
  }

  if (passwordConfirm !== password) {
    return next(
      new AppError('Password and password confirm does not match', 400)
    );
  }

  try {
    const user = await User.findOne({ email: email }).select(
      '+passwordResetToken +passwordResetExpiry'
    );

    if (!user) {
      return next(new AppError('No user exists with that email', 400));
    }

    if (!user.verifyPasswordResetToken(passwordResetToken)) {
      return next(new AppError('Password reset token is not valid', 400));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;

    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Password reset successfully',
      },
    });
  } catch (error) {
    next(error);
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  let permit = false;

  roles.forEach((el) => {
    if (req.user.role === el) {
      permit = true;
    }
  });

  if (permit) {
    return next();
  }

  next(new AppError('You are not authorized to access', 403));
};

module.exports = {
  signup,
  login,
  protect,
  isSignedIn,
  forgotPassword,
  resetPassword,
  restrictTo,
};
