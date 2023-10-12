const router = require('express').Router();
const settingController = require('../../controllers/settingController');

router.get('/', settingController.getList);

router.get('/:id([0-9])', settingController.getById);

router.post('/', settingController.create);

router.post('/:id([0-9])', settingController.update);

router.delete('/:id([0-9])', settingController.deleteById);

module.exports = router;