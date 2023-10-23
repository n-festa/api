const Joi = require('joi');
const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const async = require('async');
const jwt = require('jsonwebtoken');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');
const BaseController = require('../controllers/BaseController');
const stringUtil = require('../utils/stringUtil');
const email = require('../utils/email');
const config = require('../config/config.js');
const auth = require('../utils/auth');
const authMethod = require('../utils/auth');
const jwtVariable = require('../utils/jwt');
const axios = require('axios');
const FormData = require('form-data');
const session = require('express-session')

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};


class AuthAdminController extends BaseController {
	static async login(req, res) {
		try{
			const data = req.body;
			const options = { where: { email: data.email } };
			const user = await super.getByCustomOptions(req, 'admin', options);

			if (!user) {
				requestHandler.throwError(400, 'bad request', 'khong tim thay admin co dung email nay')();
			}

			if(user.password  !== data.password ){
				requestHandler.throwError(400, 'bad request', 'sai password')();
			}else{
				const result = await super.getByCustomOptions(req, 'admin', options);
				return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
			}

		}catch(err){
			requestHandler.sendError(req, res, err);
		}
	}

	static async refreshToken(req, res) {
		try {
			const data = req.body;
			if (_.isNull(data)) {
				requestHandler.throwError(400, 'bad request', 'please provide the refresh token in request body')();
			}
			const schema = {
				refreshToken: Joi.string().required(),
			};
			const { error } = Joi.validate({ refreshToken: req.body.refreshToken }, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');
			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);

			if ((data.refreshToken) && (data.refreshToken in tokenList)) {
				const token = jwt.sign({ user }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expiresin, algorithm: 'HS512' });
				const response = {
					token,
				};
				// update the token in the list
				tokenList[data.refreshToken].token = token;
				requestHandler.sendSuccess(res, 'a new token is issued ', 200)(response);
			} else {
				requestHandler.throwError(400, 'bad request', 'no refresh token present in refresh token list')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async logOut(req, res) {
		try {
			const schema = {
				platform: Joi.string().valid('ios', 'android', 'web').required(),
				fcmToken: Joi.string(),
			};
			const { error } = Joi.validate({
				platform: req.headers.platform, fcmToken: req.body.fcmToken,
			}, schema);
			requestHandler.validateJoi(error, 400, 'bad Request', error ? error.details[0].message : '');

			const tokenFromHeader = auth.getJwtToken(req);
			const user = jwt.decode(tokenFromHeader);
			const options = {
				where: {
					fcmToken: req.body.fcmToken,
					platform: req.headers.platform,
					user_id: user.payload.id,
				},
			};
			const fmcToken = await super.getByCustomOptions(req, 'UserTokens', options);
			req.params.id = fmcToken.dataValues.id;
			const deleteFcm = await super.deleteById(req, 'UserTokens');
			if (deleteFcm === 1) {
				requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
			} else {
				requestHandler.throwError(400, 'bad request', 'User Already logged out Successfully')();
			}
		} catch (err) {
			requestHandler.sendError(req, res, err);
		}
	}

	static async customer_login(req,res){
		try{
			const data = req.body;
			const options = { where: { email: data.email } };
			const user = await super.getByCustomOptions(req, 'customers', options);

			if (!user) {
				requestHandler.throwError(400, 'bad request', 'khong tim thay customers co dung email nay')();
			}

			if(user.password  !== data.password ){
				requestHandler.throwError(400, 'bad request', 'sai password')();
			}

			// token
			/*
			const accessTokenLife =
				process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
			const accessTokenSecret =
				process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

			const dataForAccessToken = {
				username: user.username,
			};
			const accessToken = await authMethod.generateToken(
				dataForAccessToken,
				accessTokenSecret,
				accessTokenLife,
			);
			if (!accessToken) {
				return res
					.status(401)
					.send('Đăng nhập không thành công, vui lòng thử lại.');
			}
			let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
			if (!user.refreshToken) {
				// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
				// await userModel.updateRefreshToken(user.username, refreshToken);
			} else {
				// Nếu user này đã có refresh token thì lấy refresh token đó từ database
				refreshToken = user.refreshToken;
			}
			*/
		
			const result = await super.getByCustomOptions(req, 'customers', options);
			return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
			
		}catch(err){
			requestHandler.sendError(req, res, err);
		}
	}

	static async customer_logout(req, res){
		try{

		}catch(err){
			requestHandler.sendError(req,res, err);
		}
	}

	static async verifyPhone(req, res){
		let data = new FormData();
		data.append('u','2alltest');
		data.append('pws','2alltest'); 
		data.append('from','Vlocal'); 
	//	data.append('phone','84905005248'); 
//		data.append('sms','224466'); // funtion random 6 so
		data.append('bid','123'); 
		data.append('pid',''); 
		data.append('type','0'); 
		data.append('json','1'); 

		let config = {
			method: 'post',
			maxBodyLength : Infinity,
			url : 'https://cloudsms4.vietguys.biz:4438/api/index.php',
			headers: {
				...data.getHeaders()
			},
			data: data
		};

		axios.request(config)
			.then((response) =>{
				console.log(JSON.stringify(response.data));
			})
			.catch((error) =>{
				console.log(error);
			})
// cloudsms4,vietguys.biz:4438/api/index.php
		return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });	
	}

	static async createOTP(req, res){
		//res.status(200).send("Public .");
		const sms = stringUtil.generateNumber();
		const phone = req.body.phone;
		req.session.otp = {
	        phone: phone,
	        sms: sms,
	    }

	    
		let data = new FormData();
		data.append('u','2alltest');
		data.append('pwd','3ef20dcd-62a2-404a-aa6d-69551fcb4fdf'); 
		data.append('from','Vlocal'); 
		data.append('phone',phone); 
		data.append('sms',sms); // funtion random 6 so
		data.append('bid','123'); 
		data.append('pid',''); 
		data.append('type','0'); 
		data.append('json','1'); 

		let config = {
			method: 'post',
			maxBodyLength : Infinity,
			url : 'https://cloudsms4.vietguys.biz:4438/api/index.php',
			headers: {
				...data.getHeaders()
			},
			data: data
		};
		const result ="";

		axios.request(config)
			.then((response) =>{
				console.log(JSON.stringify(response.data));
				const result = response.data;
			})
			.catch((error) =>{
				console.log(error);
			})
		
		return res.status(200).json({status: 'success', result: result})

	}

	static async set_session(req,res){
		req.session.User = {
	        website: 'anonystick.com',
	        type: 'blog javascript',
	        like: '4550'
	    }
	    return res.status(200).json({status: 'success'})
	}

	static async get_session(req,res){
		console.log(stringUtil.generateString());
	    if(req.session.otp){
	        return res.status(200).json({status: 'success', session: req.session.otp})
	    }
	    return res.status(200).json({status: 'error', session: 'No session', sms : stringUtil.generateNumber()})

	}

	static async checkOTP(req,res){
		if(req.session.otp){
			const currentOTP = req.session.otp.sms;

			const otp = req.body.otp;
			if(otp  == currentOTP){
				return res.status(200).json({status: 'success', message: "dung otp",otp: currentOTP});
			}else{
				return res.status(200).json({status: 'error', message: "sai otp", otp: currentOTP});
			}
	    }

	    return res.status(200).json({status: 'error', session: 'No session'})
	}


	static async setEnergy(req,res){
		const axios = require('axios');

		// const ngaySinh = req.body.ngaySinh;
		// const chieuCao = req.body.chieuCao;
		// const canNang = req.body.canNang;
		// const gioiTinh = req.body.gioiTinh;
		// const loaiLaoDong = req.body.loaiLaoDong;

		let data = JSON.stringify({
			"doiTuong": 1,
			"ngaySinh": "1990-10-09T00:00:00+07:00",
			"chieuCao": 175,
			"canNang": 70,
			"gioiTinh": 1,
			"isKinhNguyet": false,
			"isMangThai": false,
			"isChoConBu": false,
			"isTienManKinh": false,
			"loaiLaoDong": 2,
			"cheDoAn": 8,
			"heSoPA": "1.0",
			"heSoAF": 1,
			"trangThaiTrongLuong": 1,
			"nhuCauDieuChinhCanNang": 2
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://app.thucdongiadinh.vn/api/services/app/TraCuuNhuCauDinhDuong/TraCuuNhuCauDinhDuong',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data
		};
		console.log("config",config);



		try{
			const response = await axios.request(config);

			const result = JSON.stringify(response.data);
			return res.status(200).json({status: 'success', result: result})
		} catch (error) {
			console.log(error);
			return res.status(500).json({status: 'fail', result: error})
		};
			

		// return res.status(200).json({status: 'success', result: "response"})
		//return data;
	}
}
module.exports = AuthAdminController;
