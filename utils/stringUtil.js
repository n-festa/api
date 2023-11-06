const { valid } = require("joi");
const { or } = require("sequelize");

module.exports = {
  generateString() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  createOTP() {
    const validTimeForOTP = 15 * 60 * 1000; //2 minutes
    const possible = "0123456789";

    let result = { OTP: "", created_at: "", expired_at: "" };
    //generate OTP
    for (let i = 0; i < 6; i++) {
      result.OTP += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }

    const currentTimestamp = Date.now();
    result.created_at = currentTimestamp;
    result.expired_at = currentTimestamp + validTimeForOTP; //miliseconds

    return result;
  },
  //validatePhone
  validatePhone(phoneNumber) {
    //get only number from phoneNumber
    const validateHoneNumber = phoneNumber.replace(/\D/g, "");

    const length = validateHoneNumber.length;
    if (length < 11 || length > 12) return false;
    return true;
  },
};
