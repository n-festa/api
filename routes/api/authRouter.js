const router = require("express").Router();
const AuthAdminController = require("../../controllers/authAdminController");
// const CustomerController = require("../../controllers/customerController");
const AuthCustomerController = require("../../controllers/authCustomerController");
const auth = require("../../utils/auth");

router.post("/admin/login", AuthAdminController.login);
router.post(
  "/refreshToken",
  auth.verifyToken,
  AuthAdminController.refreshToken
);
router.post("/admin/logout", auth.verifyToken, AuthAdminController.logOut);

// router.post("/register", CustomerController.create);

// router.post('/verifyPhone', AuthAdminController.verifyPhone);
router.post("/login", AuthCustomerController.login);
router.post("/requestOTP", AuthCustomerController.requestOTP);
router.get("/get_session", AuthCustomerController.get_session);
router.post("/authenticateOTP", AuthCustomerController.authenticateOTP);
router.post("/setEnergy", AuthCustomerController.setEnergy);
module.exports = router;
