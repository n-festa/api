const router = require('express').Router();
const customerController = require('../../controllers/customerController');
//const auth = require('../../utils/auth');

router.get('/', customerController.getList);


module.exports = router;