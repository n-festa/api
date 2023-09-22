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
			const result = await super.getById(req, 'categories', options);
		//	const result = await super.getById(req, 'categories');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}


		static async create(req, res){
		try{
			const data = req.body;
			//requestHandler.sendSuccess(res, 'categories created successfully', 201)();
			const createdCategories = await super.create(req, 'categories');
			
			if (!(_.isNull(createdCategories))) {
				requestHandler.sendSuccess(res, 'categories created successfully', 201)();
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
			const result = await super.getByCustomOptions(req, 'categories', options);

			if (result) {
				const updatedCategories = await super.updateById(req, 'categories',data);
				if (!(_.isNull(updatedCategories))) {
					requestHandler.sendSuccess(res, 'categories update successfully', 201)();
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
			const result = await super.deleteById(req, 'categories');
			return requestHandler.sendSuccess(res, 'categories Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = CategoriesController;