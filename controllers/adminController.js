const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");
const Admin = db.admin;

class AdminController extends BaseController{
	static async getListAdmins(req, res){
		try {
			const result = await super.getList(req, 'admin');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getAdminById(req, res){
		//res.status(200).send("Public .");
		try {
			const result = await super.getById(req, 'admin');
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
			const user = await super.getByCustomOptions(req, 'admin', options);

			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email ,email already existed')();
			}

			const createdUser = await super.create(req, 'admin');
			
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
			const user = await super.getByCustomOptions(req, 'admin', options);

			if (user) {
				const updatedUser = await super.updateById(req, 'admin',data);
				if (!(_.isNull(updatedUser))) {
					requestHandler.sendSuccess(res, 'email with your password sent successfully', 201)();
				} else {
					requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
				}
			}else{
				requestHandler.throwError(400, 'bad request', 'khong tim thay email')();
			}
		}catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async deleteById(req, res) {
		try {
			const result = await super.deleteById(req, 'admin');
			return requestHandler.sendSuccess(res, 'User Admin Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = AdminController;