const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
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
  updateMe,
};
