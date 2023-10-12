const router = require('express').Router();
const storeController = require('../../controllers/storeController');

router.get('/', storeController.getList);

router.get('/:id([0-9])', storeController.getById);

router.post('/', storeController.create);

router.post('/:id([0-9])', storeController.update);

router.delete('/:id([0-9])', storeController.deleteById);

module.exports = router;