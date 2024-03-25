const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');
const CONSTANT = require('../config/constant');
const { MailFunction } = require('../helpers');
const ApiError = require('../utils/ApiError');


const sendOptToUser = catchAsync(async (req, res) => {
    const result = await authService.sendOTP(req.body.email);

    res.send(result);
});

const createUser = catchAsync(async (req, res) => {
    const result = await authService.create(req.body);
    res.send(result);
});

const login = catchAsync(async (req, res) => {
    var {email} = req.body;
    email = email.toLocaleLowerCase()
    const user = await authService.loginUserWithEmail(email);
    res.send(user);
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    // res.status(httpStatus.NO_CONTENT).send();
    res.send({ data: {}, code: CONSTANT.SUCCESSFUL, message: CONSTANT.Logout_MSG })
});

module.exports = {
    sendOptToUser,
    createUser,
    login,
    logout
};