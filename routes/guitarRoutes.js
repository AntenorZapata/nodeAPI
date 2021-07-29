const express = require('express');

const router = express.Router();
const guitarsController = require('../controllers/guitarsController');

router.param('id', guitarsController.checkID); // middleware
// router.param('body', guitarsController.checkBody);

router
  .route('/')
  .get(guitarsController.getAllGuitars)
  .post(guitarsController.checkBody, guitarsController.createGuitar);

router
  .route('/:id')
  .get(guitarsController.getGuitar)
  .patch(guitarsController.upDateGuitar)
  .delete(guitarsController.deleteGuitar);

module.exports = router;
