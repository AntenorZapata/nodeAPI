const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');

const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRoutes');
const globalError = require('./controllers/errorController');

// Middlewares

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);

  next();
});

app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Global error handler
app.use(globalError);

module.exports = app;
