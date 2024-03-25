const Joi = require('joi');
const { objectId } = require('./custom.validation');


const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        userType: Joi.string().valid('student', 'company').required(),
        otp: Joi.number().required()
    }),
   
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        userType: Joi.string().valid('student', 'company').required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const otp = {
    body: Joi.object().keys({
        email:Joi.string().required().email(),
    })
}

module.exports = {
    otp,
    register,
    login,
    refreshTokens,
    logout,
    
};