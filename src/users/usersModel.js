// Third Party Imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'passwordConfirm is required'],
    validate: function validator(v) {
      return this.password === v;
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address: String,
  pincode: String,
  mobileNumber: String,
  passwordResetToken: String,
  passwordResetExpiry: Date,
});

/**
 * If password modified
 * Encrypt the password
 * Delete the password confirm field
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword,
  correctPassword
) {
  return await bcrypt.compare(inputPassword, correctPassword);
};

userSchema.methods.generateJWT = async function (id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.generatePasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = resetToken;
  this.passwordResetExpiry = Date.now() + 10 * 60 * 60 * 1000; // 10 minutes

  const encryptedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  return encryptedResetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
