const Joi = require("joi");
const randToken = require("rand-token");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const async = require("async");
const jwt = require("jsonwebtoken");
const RequestHandler = require("../utils/RequestHandler");
const Logger = require("../utils/logger");
const BaseController = require("../controllers/BaseController");
const stringUtil = require("../utils/stringUtil");
const email = require("../utils/email");
const config = require("../config/config.js");
const auth = require("../utils/auth");
const authMethod = require("../utils/auth");
const jwtVariable = require("../utils/jwt");
const axios = require("axios");
const FormData = require("form-data");
const session = require("express-session");

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const tokenList = {};

class AuthAdminController extends BaseController {
  static async login(req, res) {
    try {
      const data = req.body;
      const options = { where: { email: data.email } };
      const user = await super.getByCustomOptions(req, "admin", options);

      if (!user) {
        requestHandler.throwError(
          400,
          "bad request",
          "khong tim thay admin co dung email nay"
        )();
      }

      if (user.password !== data.password) {
        requestHandler.throwError(400, "bad request", "sai password")();
      } else {
        const result = await super.getByCustomOptions(req, "admin", options);
        return requestHandler.sendSuccess(
          res,
          "User Data Extracted"
        )({ result });
      }
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  static async refreshToken(req, res) {
    try {
      const data = req.body;
      if (_.isNull(data)) {
        requestHandler.throwError(
          400,
          "bad request",
          "please provide the refresh token in request body"
        )();
      }
      const schema = {
        refreshToken: Joi.string().required(),
      };
      const { error } = Joi.validate(
        { refreshToken: req.body.refreshToken },
        schema
      );
      requestHandler.validateJoi(
        error,
        400,
        "bad Request",
        error ? error.details[0].message : ""
      );
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);

      if (data.refreshToken && data.refreshToken in tokenList) {
        const token = jwt.sign({ user }, config.auth.jwt_secret, {
          expiresIn: config.auth.jwt_expiresin,
          algorithm: "HS512",
        });
        const response = {
          token,
        };
        // update the token in the list
        tokenList[data.refreshToken].token = token;
        requestHandler.sendSuccess(
          res,
          "a new token is issued ",
          200
        )(response);
      } else {
        requestHandler.throwError(
          400,
          "bad request",
          "no refresh token present in refresh token list"
        )();
      }
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  static async logOut(req, res) {
    try {
      const schema = {
        platform: Joi.string().valid("ios", "android", "web").required(),
        fcmToken: Joi.string(),
      };
      const { error } = Joi.validate(
        {
          platform: req.headers.platform,
          fcmToken: req.body.fcmToken,
        },
        schema
      );
      requestHandler.validateJoi(
        error,
        400,
        "bad Request",
        error ? error.details[0].message : ""
      );

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const options = {
        where: {
          fcmToken: req.body.fcmToken,
          platform: req.headers.platform,
          user_id: user.payload.id,
        },
      };
      const fmcToken = await super.getByCustomOptions(
        req,
        "UserTokens",
        options
      );
      req.params.id = fmcToken.dataValues.id;
      const deleteFcm = await super.deleteById(req, "UserTokens");
      if (deleteFcm === 1) {
        requestHandler.sendSuccess(res, "User Logged Out Successfully")();
      } else {
        requestHandler.throwError(
          400,
          "bad request",
          "User Already logged out Successfully"
        )();
      }
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }
}
module.exports = AuthAdminController;