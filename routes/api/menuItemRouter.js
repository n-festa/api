const router = require('express').Router();
const menuItemController = require('../../controllers/menuItemController');
//const auth = require('../../utils/auth');

router.get('/', menuItemController.getListMenuItem);

router.get('/:id([0-9])', menuItemController.getById);

router.post('/', menuItemController.create);

router.post('/:id([0-9])', menuItemController.update);

router.delete('/:id([0-9])', menuItemController.deleteById);

module.exports = router;