const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const RequestHandler = require("../utils/RequestHandler");
const Logger = require("../utils/logger");
const BaseController = require("../controllers/BaseController");
const stringUtil = require("../utils/stringUtil");
const thirdPartyAPI = require("../utils/thirdPartyAPI");
const config = require("../config/config.js");
const auth = require("../utils/auth");
const axios = require("axios");
const FormData = require("form-data");
const session = require("express-session");

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};

class AuthCustomerController extends BaseController {
  static async login(req, res) {
    try {
      const data = req.body;
      const options = { where: { email: data.email } };
      const user = await super.getByCustomOptions(req, "customers", options);

      if (!user) {
        requestHandler.throwError(
          400,
          "bad request",
          "khong tim thay customers co dung email nay"
        )();
      }

      if (user.password !== data.password) {
        requestHandler.throwError(400, "bad request", "sai password")();
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

      const result = await super.getByCustomOptions(req, "customers", options);
      return requestHandler.sendSuccess(res, "User Data Extracted")({ result });
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  static async logout(req, res) {
    try {
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  // 	static async verifyPhone(req, res){
  // 		let data = new FormData();
  // 		data.append('u','2alltest');
  // 		data.append('pws','2alltest');
  // 		data.append('from','Vlocal');
  // 	//	data.append('phone','84905005248');
  // //		data.append('sms','224466'); // funtion random 6 so
  // 		data.append('bid','123');
  // 		data.append('pid','');
  // 		data.append('type','0');
  // 		data.append('json','1');

  // 		let config = {
  // 			method: 'post',
  // 			maxBodyLength : Infinity,
  // 			url : 'https://cloudsms4.vietguys.biz:4438/api/index.php',
  // 			headers: {
  // 				...data.getHeaders()
  // 			},
  // 			data: data
  // 		};

  // 		axios.request(config)
  // 			.then((response) =>{
  // 				console.log(JSON.stringify(response.data));
  // 			})
  // 			.catch((error) =>{
  // 				console.log(error);
  // 			})
  // // cloudsms4,vietguys.biz:4438/api/index.php
  // 		return requestHandler.sendSuccess(res, 'User Data Extracted')({ result });
  // 	}

  static async requestOTP(req, res) {
    const phoneNumber = req.body.phoneNumber;
    let result = {
      status: "",
      info: "",
    };

    //Tạo OTP cho phoneNumber
    const otpInfo = stringUtil.createOTP();

    //Lưu thông tin OTP vừa tạo vào session
    req.session.otp = {
      phoneNumber: phoneNumber,
      otpCode: otpInfo.OTP,
      created_at: otpInfo.created_at,
      expired_at: otpInfo.expired_at,
    };

    // //Gửi SMS kèm OTP cho phoneNumber
    try {
      //const response = await thirdPartyAPI.sendOTPSMS(phoneNumber, otpInfo.OTP);
      const response = req.session.otp;
      result.status = "success";
      result.info = response;
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
      result.status = "error";
      result.info = error.toString();
      return res.status(500).json(result);
    }
  }

  //   static async set_session(req, res) {
  //     req.session.User = {
  //       website: "anonystick.com",
  //       type: "blog javascript",
  //       like: "4550",
  //     };
  //     return res.status(200).json({ status: "success" });
  //   }

  static async get_session(req, res) {
    let result = {
      status: "success",
      info: "No session",
    };

    if (req.session.otp) {
      result.info = req.session.otp;
    }

    return res.status(200).json(result);
  }

  static async authenticateOTP(req, res) {
    let result = {
      status: "",
      info: "",
    };
    const phoneNumber = req.body.phoneNumber;
    const inputOTP = req.body.inputOTP;

    // Lấy currentOTP mới nhất của phoneNumber mà được lưu ở session
    if (!req.session.otp) {
      //no session
      result.status = "failed";
      result.info = "OTP không hợp lệ , khong ton tai";
      return res.status(200).json(result);
    }
    const currentOTP = req.session.otp;

    //Kiểm tra số điện thoại
    if (phoneNumber != currentOTP.phoneNumber) {
      //Số điện thoại không khớp
      result.status = "failed";
      result.info = "OTP không dung";
      return res.status(200).json(result);
    }

    //Kiểm tra tính hiệu lực của current OTP
    const currentTime = Date.now();
    if (currentTime > currentOTP.expired_at) {
      result.status = "failed";
      result.info = "OTP quá thời gian hiệu lực";
      return res.status(200).json(result);
    }

    //So sánh OTP gửi lên với currentOTP
    if (currentOTP.otpCode != inputOTP) {
      result.status = "failed";
      result.info = "Sai OTP";
      return res.status(200).json(result);
    }

    req.session.destroy();

    result.status = "success";
    result.info = {
      phoneNumber: phoneNumber,
      otpCode: inputOTP,
      message: "Xác thực thành công",
    };
    return res.status(200).json(result);
  }

  static async setEnergy(req, res) {
    const axios = require("axios");

     const ngaySinh = req.body.data.ngaySinh;
     const chieuCao = req.body.data.chieuCao;
     const canNang = req.body.data.canNang;
     const gioiTinh = req.body.data.gioiTinh;
     const loaiLaoDong = req.body.data.loaiLaoDong;

    let data = JSON.stringify({
      doiTuong: 1,
    //  ngaySinh: "1990-10-09T00:00:00+07:00",
      //chieuCao: 175,
      //canNang: 70,
      //gioiTinh: 1,
      ngaySinh : ngaySinh,
      chieuCao : chieuCao,
      canNang : canNang,
      gioiTinh : gioiTinh,
      isKinhNguyet: false,
      isMangThai: false,
      isChoConBu: false,
      isTienManKinh: false,
     // loaiLaoDong: 2,
      loaiLaoDong :loaiLaoDong,
      cheDoAn: 8,
      heSoPA: "1.0",
      heSoAF: 1,
      trangThaiTrongLuong: 1,
      nhuCauDieuChinhCanNang: 2,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://app.thucdongiadinh.vn/api/services/app/TraCuuNhuCauDinhDuong/TraCuuNhuCauDinhDuong",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("config", config);

    try {
      const response = await axios.request(config);

      //const result = JSON.stringify(response.data);
      const result = response.data;
      return res.status(200).json({ status: "success", result: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", result: error });
    }

    // return res.status(200).json({status: 'success', result: "response"})
    //return data;
  }
}
module.exports = AuthCustomerController;
