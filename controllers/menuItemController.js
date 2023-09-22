const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class MenuItemController extends BaseController{
	static async getListMenuItem(req, res){
		try {
			const result = await super.getList(req, 'menu_item');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async getById(req, res){
		try {
			const reqParam = req.params.id;

			const result = await super.getById(req, 'menu_item');
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	static async create(req, res){
		try{
			const data = req.body;

			const createdMenuItem = await super.create(req, 'menu_item');
			
			if (!(_.isNull(createdMenuItem))) {
				requestHandler.sendSuccess(res, 'product created successfully', 201)();
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
			const menu_item = await super.getByCustomOptions(req, 'menu_item', options);

			if (menu_item) {
				const updatedMenuItem = await super.updateById(req, 'menu_item',data);
				if (!(_.isNull(updatedMenuItem))) {
					requestHandler.sendSuccess(res, 'product created successfully', 201)();
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
			const result = await super.deleteById(req, 'menu_item');
			return requestHandler.sendSuccess(res, 'Menu Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = MenuItemController;