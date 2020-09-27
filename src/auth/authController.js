const User = require('../users/usersModel');

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

    res.status(200).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
