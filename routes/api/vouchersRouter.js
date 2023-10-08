const router = require('express').Router();
const vouchersController = require('../../controllers/vouchersController');
//const auth = require('../../utils/auth');

router.get('/', vouchersController.getList);

router.get('/:id([0-9])', vouchersController.getById);

router.post('/', vouchersController.create);

router.post('/:id([0-9])', vouchersController.update);

router.delete('/:id([0-9])', vouchersController.deleteById);

module.exports = router;