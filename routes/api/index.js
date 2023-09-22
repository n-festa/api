const router = require('express').Router();

router.use('/', require('./authRouter'));
router.use('/email', require('./sendEmail'));
router.use('/admin', require('./adminRouter'));
router.use('/menu_items', require('./menuItemRouter'));
router.use('/categories', require('./categoriesRoutes'));
router.use('/order', require('./orderRouter'));

module.exports = router;