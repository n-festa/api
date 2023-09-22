const router = require('express').Router();
const categoriesController = require('../../controllers/categoriesController');
//const auth = require('../../utils/auth');

router.get('/', categoriesController.getListCate);

router.get('/:id([0-9])', categoriesController.getCateById);

router.post('/', categoriesController.create);

router.post('/:id([0-9])', categoriesController.update);

router.delete('/:id([0-9])', categoriesController.deleteById);

module.exports = router;