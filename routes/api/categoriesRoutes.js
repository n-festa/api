const router = require('express').Router();
const categoriesController = require('../../controllers/categoriesController');
//const auth = require('../../utils/auth');

router.get('/', categoriesController.getListCate);

router.get('/:id([0-9])', categoriesController.getCateById);

module.exports = router;