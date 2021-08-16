const express = require('express');

const router = express.Router();
const guitarsController = require('../controllers/guitarsController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

// router.param('id', guitarsController.checkID); // middleware
// router.param('body', guitarsController.checkBody);

router.use('/:guitarId/reviews', reviewRouter);

router.route('/guitar-stats').get(guitarsController.getGuitarStats);
// router.route('/monthly-plan/:year').get(guitarsController.getMonthlyPlan);

router
  .route('/top-5-cheap')
  .get(guitarsController.aliasTopGuitars, guitarsController.getAllGuitars);

router
  .route('/top-5-fender')
  .get(guitarsController.aliasTopFender, guitarsController.getAllGuitars);

router
  .route('/')
  .get(authController.protect, guitarsController.getAllGuitars)
  .post(guitarsController.createGuitar);

router
  .route('/:id')
  .get(guitarsController.getGuitar)
  .patch(guitarsController.upDateGuitar)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-moderator'),
    guitarsController.deleteGuitar
  );

// router
//   .route('/:guitarId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
