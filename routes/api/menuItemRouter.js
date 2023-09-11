const router = require('express').Router();
const menuItemController = require('../../controllers/menuItemController');
//const auth = require('../../utils/auth');

router.get('/', menuItemController.getListMenuItem);


module.exports = router;