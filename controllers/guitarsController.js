const fs = require('fs');
const guitars = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/guitars-simple.json`)
);

const checkID = (req, res, next, value) => {
  if (+req.params.id > guitars.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(404).json({
      status: 'fail',
      message: 'no body',
    });
  }
  next();
};

const getAllGuitars = (req, res) => {
  res.status(200).json({
    requestAt: req.requestTime,
    status: 'success',
    results: guitars.length,
    data: {
      guitars,
    },
  });
};

const getGuitar = (req, res) => {
  const guitar = guitars.find((item) => item.id === +req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
};

const createGuitar = (req, res) => {
  const newId = guitars[guitars.length - 1].id + 1;
  const newGuitar = Object.assign({ id: newId }, req.body);
  guitars.push(newGuitar);

  fs.writeFile(
    `${__dirname}/../dev-data/data/guitars-simple.json`,
    JSON.stringify(guitars),
    (err) => {
      res.status(201).json({
        status: 'succees',
        data: {
          guitar: newGuitar,
        },
      });
    }
  );
};

const upDateGuitar = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      guitar: 'Update guitar',
    },
  });
};

const deleteGuitar = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllGuitars,
  getGuitar,
  upDateGuitar,
  createGuitar,
  deleteGuitar,
  checkID,
  checkBody,
};
