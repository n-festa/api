const router = require('express').Router();
const ingredientsController = require('../../controllers/ingredientsController');
//const auth = require('../../utils/auth');

router.get('/', ingredientsController.getList);

router.get('/:id([0-9])', ingredientsController.getById);

router.post('/', ingredientsController.create);

router.post('/:id([0-9])', ingredientsController.update);

router.delete('/:id([0-9])', ingredientsController.deleteById);

module.exports = router;