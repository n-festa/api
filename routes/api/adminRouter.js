const router = require('express').Router();
const reviewController = require('../../controllers/reviewController');
//const auth = require('../../utils/auth');

router.get('/', reviewController.getList);

router.get('/:id([0-9])', reviewController.getById);

router.post('/', reviewController.create);

router.post('/:id([0-9])', reviewController.update);

router.delete('/:id([0-9])', reviewController.deleteById);

module.exports = router;