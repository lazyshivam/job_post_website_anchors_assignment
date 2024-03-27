const express = require('express');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });
const validate = require('../../middlewares/validate');
const authValidatoin = require('../../validations/auth.validate');
const { authController } = require('../../controllers')

const router = express.Router();

// router.route('/change-password').post(companyAuth('getUsersWithoutPagination'), userController.changePassword);

router.post('/auth/sendOtp', validate(authValidatoin.otp), authController.sendOptToUser); 
router.post('/auth/register', validate(authValidatoin.register), authController.createUser);
router.post('/auth/login', validate(authValidatoin.login), authController.login);
router.post('/auth/logout', validate(authValidatoin.logout), authController.logout);
// router.post('/auth/refresh-tokens', validate(authValidatoin.refreshTokens), authController.refreshTokens);
// router.get('/auth/verify',validate(authValidatoin.verifyEmail),authController.verifyEmail);
// router.post('/auth/resend-emailVerification',authValidatoin.resendEmailVerification);

module.exports = router;