const express = require('express');
const morgan = require('morgan');

const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRoutes');

// Middlewares

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
