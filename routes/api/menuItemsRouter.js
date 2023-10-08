const router = require('express').Router();
const menuItemsController = require('../../controllers/menuItemsController');
//const auth = require('../../utils/auth');

router.get('/', menuItemsController.getListMenuItem);

router.get('/:id([0-9])', menuItemsController.getById);

router.post('/', menuItemsController.create);

router.post('/:id([0-9])', menuItemsController.update);

router.delete('/:id([0-9])', menuItemsController.deleteById);

module.exports = router;