const router = require('express').Router();
const controller = require("../controllers/user.controller");

router.use('/api/v1', require('./api'));


module.exports = router;
