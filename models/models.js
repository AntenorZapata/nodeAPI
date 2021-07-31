const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A guitar must have a name'],
    unique: true,
  },
  rating: {
    type: {
      type: Number,
      default: 4.5,
    },
  },
  price: {
    type: Number,
    required: [true, 'A guitar must have a price'],
  },
});

const Guitar = mongoose.model('Guitar', guitarSchema);

const testGuitar = new Guitar({
  name: 'Tonante',
  rating: 4.7,
  price: 800,
});

module.exports = {
  Guitar,
  testGuitar,
};
