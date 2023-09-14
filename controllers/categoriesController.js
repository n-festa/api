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

class CategoriesController extends BaseController{
	static async getListCate(req, res){
		try {
			const result = await super.getList(req, 'categories');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getCateById(req, res){
		//res.status(200).send("Public .");
		try {
			let options = {
				where : {
					id: 1
				}
			}
			const result = await super.getByCustomOptions(req, 'categories', options);
		//	const result = await super.getById(req, 'categories');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = CategoriesController;