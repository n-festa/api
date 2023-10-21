const router = require('express').Router();
const AuthAdminController = require('../../controllers/authAdminController');
const CustomerController = require('../../controllers/customerController');
const auth = require('../../utils/auth');

router.post('/admin/login', AuthAdminController.login);
router.post('/refreshToken', auth.verifyToken, AuthAdminController.refreshToken);
router.post('/admin/logout', auth.verifyToken, AuthAdminController.logOut);


router.post('/login', AuthAdminController.customer_login);
router.post('/register', CustomerController.create);
router.post('/verifyPhone', AuthAdminController.verifyPhone);

router.post('/createOTP', AuthAdminController.createOTP);
router.get('/set_session', AuthAdminController.set_session);
router.get('/get_session', AuthAdminController.get_session);
router.post('/checkOTP', AuthAdminController.checkOTP);

module.exports = router;
