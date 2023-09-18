const router = require('express').Router();
const ordersController = require('../../controllers/ordersController');


router.get('/', ordersController.getList);

router.get('/:id([0-9])', ordersController.getById);

module.exports = router;