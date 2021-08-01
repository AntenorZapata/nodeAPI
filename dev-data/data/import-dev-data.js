const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Guitar = require('../../models/guitarModel');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connection success');
  });

const guitars = JSON.parse(
  fs.readFileSync(`${__dirname}/guitars-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Guitar.create(guitars);
    console.log('data success loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteAllDataFromColl = async () => {
  try {
    await Guitar.deleteMany();
    console.log('data success deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllDataFromColl();
}
