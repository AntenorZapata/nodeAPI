// const fs = require('fs');
const Guitar = require('../models/guitarModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const aliasTopGuitars = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'model, price, ratingsAverage, summary';
  next();
};

const aliasTopFender = (req, res, next) => {
  req.query.limit = '5';
  req.query.model = 'fender';
  req.query.sort = 'price';
  req.query.fields = 'model, price';
  next();
};

const getAllGuitars = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Guitar.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const allGuitars = await features.query;

  res.status(200).json({
    requestAt: req.requestTime,
    status: 'success',
    results: allGuitars.length,
    data: {
      allGuitars,
    },
  });
});

const getGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findById(req.params.id).populate('reviews');

  if (!guitar) {
    return next(new AppError('No guitar found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
});

const createGuitar = catchAsync(async (req, res, next) => {
  const newGuitar = await Guitar.create(req.body);

  res.status(200).json({
    status: 'succees',
    data: {
      guitar: newGuitar,
    },
  });
});

const upDateGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!guitar) {
    return next(new AppError('No guitar found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
});

const deleteGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findByIdAndDelete(req.params.id);

  if (!guitar) {
    return next(new AppError('No guitar found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const getGuitarStats = catchAsync(async (req, res, next) => {
  const stats = await Guitar.aggregate([
    {
      $match: { ratingsAvarage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        numGuitars: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAvarage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

module.exports = {
  getAllGuitars,
  getGuitar,
  upDateGuitar,
  createGuitar,
  deleteGuitar,
  aliasTopGuitars,
  aliasTopFender,
  getGuitarStats,
  // getMonthlyPlan,
  // checkID,
  // checkBody,
};
