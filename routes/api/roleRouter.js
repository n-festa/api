const router = require('express').Router();
const roleController = require('../../controllers/roleController');


router.get('/', roleController.getList);

router.get('/:id([0-9])', roleController.getById);

router.post('/', roleController.create);

router.post('/:id([0-9])', roleController.update);

router.delete('/:id([0-9])', roleController.deleteById);

module.exports = router;