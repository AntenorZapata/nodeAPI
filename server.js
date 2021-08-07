const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Shuting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connection success');
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('app rodando na porta 3001');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandler rejection Shuting down');
  server.close(() => {
    process.exit(1);
  });
});
