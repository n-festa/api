const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");
const Categories = db.categories;

class AdminController extends BaseController{
	static async getListAdmins(req, res){
		try {
			const result = await super.getList(req, 'categories');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getAdminById(req, res){
		//res.status(200).send("Public .");
		try {
			const reqParam = req.params.id;

			const result = await super.getById(req, 'categories');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = AdminController;