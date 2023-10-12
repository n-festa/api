const router = require('express').Router();
const contactController = require('../../controllers/contactController');
//const auth = require('../../utils/auth');

router.get('/', contactController.getListCate);

router.get('/:id([0-9])', contactController.getCateById);

router.post('/', contactController.create);

router.post('/:id([0-9])', contactController.update);

router.delete('/:id([0-9])', contactController.deleteById);

module.exports = router;