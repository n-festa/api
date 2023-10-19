const _ = require('lodash');
const BaseController = require('../controllers/BaseController');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const db = require("../models");

class ReviewController extends BaseController{
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

	static async upload(req, res) {
		
	}
}

module.exports = ReviewController;

