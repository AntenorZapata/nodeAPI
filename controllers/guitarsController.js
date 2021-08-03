// const fs = require('fs');
const Guitar = require('../models/guitarModel');
const APIFeatures = require('../utils/apiFeatures');

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

const getAllGuitars = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

const getGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        guitar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

const createGuitar = async (req, res) => {
  try {
    const newGuitar = await Guitar.create(req.body);

    res.status(200).json({
      status: 'succees',
      data: {
        guitar: newGuitar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

const upDateGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        guitar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

const deleteGuitar = async (req, res) => {
  try {
    await Guitar.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

const getGuitarStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

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
