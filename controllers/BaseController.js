const _ = require('lodash');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const logger = new Logger();
const errHandler = new RequestHandler(logger);

class BaseController{
	constructor(options){
		this.limit = 20;
		this.options = options
	}

	static async getById(req, modelName) {

	}

	static async getByCustomOptions(req, modelName, options){

	}

	static async deleteById(req, modelName){

	}

	static async create(req, modelName, data){

	}

	static async updateById(req, modelName, data){

	}

	static async updateByCustomWhere(req, modelName, data, options){

	}

	static async getList(req, modelName, options){
		const page = req.query.page;

		let results;
		try {
			if(_.isUndefined(options)){
				options = {};
			}

			if(parseInt(page,10)){
				if(page === 0){
					options = _.extend({},options,{});
				}else{
					options = _.extend({}, options, {
						offset: this.limit * (page - 1 ),
						limit: this.limit,
					});
				}
			}else {
				options = _.extend({}, options, {});
			}

			results = await req.app.get('db')[modelName]
				.findAll(options)
				.then(
					errHandler.throwError(r => !r, 500 , 'Internal serve error' , 'something went wrong while fetching data'),
					errHandler.throwError(500, 'sequelize error')					
				).then(result => Promise.resolve(result));
		} catch(err){
			return Promise.reject(err);
		}

		return results;
	}
}


module.exports BaseController;