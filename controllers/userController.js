const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Route dosent exists',
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Route dosent exists',
  });
};

const upDateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Route dosent exists',
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Route dosent exists',
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  upDateUser,
  deleteUser,
};
