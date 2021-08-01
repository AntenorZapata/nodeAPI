const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'A guitar must have a brand'],
  },
  model: {
    type: String,
    required: [true, 'A guitar must have a model'],
  },
  year: {
    type: Number,
    required: [true, 'A guitar must have a year'],
  },
  ratingsAvarage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: [true, 'A guitar must have a location'],
  },
  summary: {
    type: String,
    required: [true, 'A guitar must have a summary'],
  },
  description: {
    type: String,
    required: [true, 'A guitar must have a description'],
  },
  player: {
    type: String,
    required: [true, 'A guitar must have a player'],
  },
  songs: {
    type: String,
    required: [true, 'A guitar must have a song'],
  },
  price: {
    type: Number,
    required: [true, 'A guitar must have a price'],
  },
  imageCover: {
    type: String,
    required: [true, 'A guitar must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  link: {
    type: String,
    required: [true, 'A guitar must have a link'],
  },
});

const Guitar = mongoose.model('Guitar', guitarSchema);

// const testGuitar = new Guitar({
//   name: 'Tonante',
//   rating: 4.7,
//   price: 800,
// });

// testGuitar
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = Guitar;
