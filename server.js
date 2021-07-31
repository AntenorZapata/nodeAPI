const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

testGuitar
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log('app rodando na porta 3000');
});
