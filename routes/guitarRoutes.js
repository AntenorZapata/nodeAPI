const express = require('express');

const router = express.Router();
const guitarsController = require('../controllers/guitarsController');

// router.param('id', guitarsController.checkID); // middleware
// router.param('body', guitarsController.checkBody);

router.route('/guitar-stats').get(guitarsController.getGuitarStats);

router
  .route('/top-5-cheap')
  .get(guitarsController.aliasTopGuitars, guitarsController.getAllGuitars);

router
  .route('/top-5-fender')
  .get(guitarsController.aliasTopFender, guitarsController.getAllGuitars);

router
  .route('/')
  .get(guitarsController.getAllGuitars)
  .post(guitarsController.createGuitar);

router
  .route('/:id')
  .get(guitarsController.getGuitar)
  .patch(guitarsController.upDateGuitar)
  .delete(guitarsController.deleteGuitar);

module.exports = router;
