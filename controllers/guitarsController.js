// const fs = require('fs');
const Guitar = require('../models/guitarModel');

// const guitars = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/guitars-simple.json`)
// );

// const checkID = (req, res, next, value) => {
//   if (+req.params.id > guitars.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// const checkBody = (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'no body',
//     });
//   }
//   next();
// };

const getAllGuitars = async (req, res) => {
  try {
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced FIltering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Guitar.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //3) field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const allGuitars = await query;

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

module.exports = {
  getAllGuitars,
  getGuitar,
  upDateGuitar,
  createGuitar,
  deleteGuitar,
  // checkID,
  // checkBody,
};
