const express = require('express');

const reviewController = require('../controllers/reviewController');

// const router = express.Router();
// const guitarsController = require('../controllers/guitarsController');

// router
//   .route('/')
//   .get(authController.protect, guitarsController.getAllGuitars)
//   .post(guitarsController.createGuitar);

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

module.exports = router;
