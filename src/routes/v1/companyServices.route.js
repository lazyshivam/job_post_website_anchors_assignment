const express = require('express');
const { companyController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const UserAuth = require('../../middlewares/userAuth');
const { companyServiceValidation } = require('../../validations');
// const multer = require('multer');
// const storage=require('../../middlewares/uploadFile');
const router = express.Router();
// const upload = multer({ storage: storage });

router.post('/addCompanyDetails',UserAuth(),validate(companyServiceValidation.validateCompanyDetails), companyController.addDetails);
router.get('/getCompanyDetails',UserAuth(),companyController.getDetails);
router.post('/deleteCompany/:id', UserAuth(), validate(companyServiceValidation.validateDeleteCompany), companyController.deleteCompany);
router.post('/postJob/:id', UserAuth(), validate(companyServiceValidation.validateJobDetails), companyController.postJob);
router.get('/getJob', UserAuth(), companyController.getJob);
router.get('/getAllJob', companyController.getAllJob);




module.exports = router;
