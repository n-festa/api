const { valid } = require("joi");

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
};
