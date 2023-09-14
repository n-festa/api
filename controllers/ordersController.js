const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");
const orders = db.orders;

class OrdersController extends BaseController{
	static async getList(req, res){
		try {
			const result = await super.getList(req, 'orders');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getById(req, res){
		//res.status(200).send("Public .");
		try {
			const reqParam = req.params.id;

			const result = await super.getById(req, 'orders');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = OrdersController;