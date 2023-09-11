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
		res.status(200).send("Public Content.");
	}

}

module.exports = MenuItemController;