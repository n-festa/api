const router = require('express').Router();

router.use('/admin', require('./adminRouter'));
router.use('/menu_items', require('./menuItemRouter'));

module.exports = router;