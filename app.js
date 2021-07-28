const express = require('express');
const morgan = require('morgan');

const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json()); // use middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);
app.use(morgan('dev'));

module.exports = app;
