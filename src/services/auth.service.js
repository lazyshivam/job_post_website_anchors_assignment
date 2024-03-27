const { authModel } = require("../models");
const CONSTANT = require("../config/constant");
const mailFunctions = require("../helpers/mailFunctions");
const User = require("../models/auth.model");
const otpService = require('./otp.service');
const tokenService = require('./token.service');



const sendOTP = async (email) => {
  const otp = otpService.generateOTP(); // Generate OTP

  // Check if user already exists
  console.log(email);

  if (await User.isEmailTaken(email)) {
    return { data: {}, code: CONSTANT.BAD_REQUEST, message: CONSTANT.USER_ALREADY_EXISTS };
  }

  const success = await mailFunctions.sendOTPOnMail(email, otp); // Send OTP via email
  console.log(success,otp);
  if (!success) {
    return { data: {}, code: CONSTANT.INTERNAL_SERVER_ERROR, message: CONSTANT.OTP_SEND_ERROR };
  }  

  // Store OTP sent to the email
  otpService.storeOTPSentToEmail(email, otp);

  return { data: { otp }, code: CONSTANT.SUCCESSFUL, message: CONSTANT.OTP_SENT_SUCCESSFULLY };
};

const create = async (userBody) => {

  // Verify OTP
  console.log(userBody);
  if (await User.isEmailTaken(userBody.email)) {
    return { data: {}, code: CONSTANT.BAD_REQUEST, message: CONSTANT.USER_ALREADY_EXISTS, };
  }
  const storedOtp = otpService.getOTPSentToEmail(userBody.email);
  if (storedOtp !== userBody.otp) {
    console.log("Verified OTP")
    return { data: {}, code: CONSTANT.UNAUTHORIZED, message: CONSTANT.INVALID_OTP };
  }

  // Create user
  const UserInfo = {
    email: userBody.email,
    userType: userBody.userType
  }
  const user = await authModel.create(UserInfo);
  console.log(user);
  const token = await tokenService.generateAuthTokens(user); // Generate token

  return { data: { user, token }, code: CONSTANT.SUCCESSFUL, message: CONSTANT.USER_CREATE };
};

const loginUserWithEmail = async (email,userType) => {
  const user = await User.findOne({email,userType});
  if (!user) {
    return { data: {}, code: CONSTANT.UNAUTHORIZED, message: CONSTANT.UNAUTHORIZED_MSG };
  }

  const token =await tokenService.generateAuthTokens(user); // Generate token

  return { data: { user, token }, code: CONSTANT.SUCCESSFUL, message: CONSTANT.Login_MSG };
};


const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    return { data: {}, code: CONSTANT.NOT_FOUND, message: CONSTANT.NOT_FOUND_MSG, };
  }
  await refreshTokenDoc.remove();
};

module.exports = {
  sendOTP,
  create,
  loginUserWithEmail,
  logout,
};
