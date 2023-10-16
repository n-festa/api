const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");

class CustomerController extends BaseController{
	static async getList(req, res){
		//res.status(200).send("Public .");
		try {
			const result = await super.getList(req, 'customers');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getById(req, res){
		//res.status(200).send("Public .");
		try {
			const result = await super.getById(req, 'customers');
			//const result = await super.getByCustomOptions(req, 'admin', options);
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async create(req, res){
		try{
			const data = req.body;

			const options = { where: { email: data.email } };
			const user = await super.getByCustomOptions(req, 'customers', options);

			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email ,email already existed')();
			}

			const createdUser = await super.create(req, 'customers');
			
			if (!(_.isNull(createdUser))) {
				requestHandler.sendSuccess(res, 'email with your password sent successfully', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}
		}catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async update(req,res){
		try{
			const data = req.body;

			const options = { where: { id: data.id } };
			const user = await super.getByCustomOptions(req, 'customers', options);

			if (user) {
				const updatedUser = await super.updateById(req, 'customers',data);
				if (!(_.isNull(updatedUser))) {
					requestHandler.sendSuccess(res, 'customers  create successfully', 201)();
				} else {
					requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
				}
			}else{
				requestHandler.throwError(400, 'bad request', 'khong tim thay customers')();
			}
		}catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async deleteById(req, res) {
		try {
			const result = await super.deleteById(req, 'customers');
			return requestHandler.sendSuccess(res, 'customers Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = CustomerController;

