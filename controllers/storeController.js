const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");

class RoleController extends BaseController{
	static async getList(req, res){
		res.status(200).send("Public .");
	}

	static async getById(req, res){
		res.status(200).send("Public .");
	}


	static async create(req, res){
		
	}

	static async update(req,res){
		
	}

	static async deleteById(req, res) {
		
	}
}

module.exports = RoleController;

