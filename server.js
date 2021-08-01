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

const port = process.env.PORT;
app.listen(port, () => {
  console.log('app rodando na porta 3000');
});
