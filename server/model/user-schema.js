const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      minlength: [3, 'Username must be minimum of 3 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email already used by another user.'],
      maxlength: [50, 'Email should not be more than 50 characters long.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be a minimum of 6 chracters long.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} does not match the expected categories: male, female.',
      },
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model('User-data', userSchema);

module.exports = userModel;
