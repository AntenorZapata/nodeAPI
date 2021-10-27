const mongoose = require('mongoose');
// const slugfy = require('slugify');

const guitarSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'A guitar must have a brand'],
    },
    model: {
      type: String,
      required: [true, 'A guitar must have a model'],
      maxlength: [40, 'A guitar model must have less or equal 40 characters'],
    },
    year: {
      type: Number,
      required: [true, 'A guitar must have a year'],
    },
    ratingsAvarage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be bellow 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
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
      type: [String],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// VIrtual populate
guitarSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'guitar',
  localField: '_id',
});

// guitarSchema.pre('save', function (next) {
//   this.slug = slugfy(this.name, { lower: true });
//   next();
// });

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
