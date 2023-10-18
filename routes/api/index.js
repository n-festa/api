const router = require('express').Router();

router.use('/', require('./authRouter'));
router.use('/email', require('./sendEmail'));
router.use('/admin', require('./adminRouter'));
router.use('/menu_items', require('./menuItemsRouter'));
router.use('/categories', require('./categoriesRoutes'));
router.use('/order', require('./orderRouter'));
router.use('/ingredientsRouter', require('./ingredientsRouter'));
router.use('/vouchers', require('./vouchersRouter'));
router.use('/customer', require('./customerRouter'));
router.use('/role', require('./roleRouter'));
router.use('/setting', require('./settingRouter'));
router.use('/store', require('./storeRouter'));
router.use('/auth', require('./authRouter'));
module.exports = router;