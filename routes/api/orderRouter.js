const router = require('express').Router();
const ordersController = require('../../controllers/ordersController');


router.get('/', ordersController.getList);

router.get('/:id([0-9])', ordersController.getById);

router.post('/', ordersController.create);

router.post('/:id([0-9])', ordersController.update);

router.delete('/:id([0-9])', ordersController.deleteById);

module.exports = router;