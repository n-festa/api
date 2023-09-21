const router = require('express').Router();
const AuthAdminController = require('../../controllers/authAdminController');
const auth = require('../../utils/auth');



router.post('/login', AuthAdminController.login);

router.post('/refreshToken', auth.isAuthunticated, AuthAdminController.refreshToken);

router.post('/logout', auth.isAuthunticated, AuthAdminController.logOut);

module.exports = router;
