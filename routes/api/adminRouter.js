const router = require('express').Router();
const adminController = require('../../controllers/adminController');
//const auth = require('../../utils/auth');

router.get('/', adminController.getAdminById);
//router.get('/:id([0-9])', auth.isAuthunticated, UsersController.getUserById);
router.get('/:id([0-9])', adminController.getAdminById);

module.exports = router;