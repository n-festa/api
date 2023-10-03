const router = require('express').Router();
const voucherController = require('../../controllers/voucherController');
//const auth = require('../../utils/auth');

router.get('/', voucherController.getList);

router.get('/:id([0-9])', voucherController.getById);

router.post('/', voucherController.create);

router.post('/:id([0-9])', voucherController.update);

router.delete('/:id([0-9])', voucherController.deleteById);

module.exports = router;