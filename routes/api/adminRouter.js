const router = require('express').Router();
const adminController = require('../../controllers/adminController');
//const auth = require('../../utils/auth');

router.get('/', adminController.getListAdmins);

router.get('/:id([0-9])', adminController.getAdminById);

router.post('/', adminController.create);

router.post('/:id([0-9])', adminController.update);

router.delete('/:id([0-9])', adminController.deleteById);

module.exports = router;