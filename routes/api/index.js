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

module.exports = router;