const router = require('express').Router();
const adminController = require('../../controllers/adminController');
//const auth = require('../../utils/auth');
/**
   * @swagger
   * definitions:
   *   Admins:
   *     required:
   *       - id
   *       - username
   *       - email
   *     properties:
   *       id:
   *         type: integer
   *       username:
   *         type: string
   *       email:
   *         type: string
   */


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Admins
 *     description: Return a specific user
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: numeric id of the user to get
 *        in: path
 *        required: true
 *        type: integer
 *        minimum: 1
 *     responses:
 *       200:
 *         description: a single user object
 *         schema:
 *           $ref: '#/definitions/users'
 */
router.get('/', adminController.getListAdmins);

router.get('/:id([0-9])', adminController.getAdminById);

module.exports = router;