const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class AdminController extends BaseController{
	static async getListAdmins(req, res){
		res.status(200).send("Public Content.");
	}

	static async getAdminById(req, res){
	//	res.status(200).send("Public .");
		try {
			const reqParam = req.params.id;
			const schema = {
				id: Joi.number().integer().min(1),
			};

			const result = await super.getById(req, 'admins');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = AdminController;