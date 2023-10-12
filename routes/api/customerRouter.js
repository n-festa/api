const router = require('express').Router();
const customerController = require('../../controllers/customerController');
//const auth = require('../../utils/auth');

router.get('/', customerController.getList);

router.get('/:id([0-9])', customerController.getById);

router.post('/', customerController.create);

router.post('/:id([0-9])', customerController.update);

router.delete('/:id([0-9])', customerController.deleteById);

module.exports = router;