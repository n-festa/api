const router = require('express').Router();

router.use('/admin', require('./adminRouter'));

module.exports = router;