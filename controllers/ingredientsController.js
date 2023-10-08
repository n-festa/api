const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");
const orders = db.orders;

class IngredientsController extends BaseController{
	static async getList(req, res){
		try {
			const result = await super.getList(req, 'ingredients');
			return requestHandler.sendSuccess(res, 'ingredient Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getById(req, res){
		//res.status(200).send("Public .");
		try {
			const reqParam = req.params.id;

			const result = await super.getById(req, 'ingredients');
			return requestHandler.sendSuccess(res, 'ingredient Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async create(req, res){
		try{
			const data = req.body;

			const createdOrder = await super.create(req, 'ingredients');
			
			if (!(_.isNull(createdOrder))) {
				requestHandler.sendSuccess(res, 'result created successfully', 201)();
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
			const result = await super.getByCustomOptions(req, 'ingredients', options);

			if (result) {
				const updatedOrder = await super.updateById(req, 'ingredient',data);
				if (!(_.isNull(updatedOrder))) {
					requestHandler.sendSuccess(res, 'result created successfully', 201)();
				} else {
					requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
				}
			}else{
				requestHandler.throwError(400, 'bad request', 'khong tim thay ingredient')();
			}
		}catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async deleteById(req, res) {
		try {
			const result = await super.deleteById(req, 'ingredients');
			return requestHandler.sendSuccess(res, 'ingredient Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

}

module.exports = IngredientsController;

