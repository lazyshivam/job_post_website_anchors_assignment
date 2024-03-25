const express = require('express');
const { companyController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const UserAuth = require('../../middlewares/userAuth');
const { companyServiceValidation } = require('../../validations');

const router = express.Router();

router.post('/addCompanyDetails',UserAuth(),validate(companyServiceValidation.validateCompanyDetails), companyController.addDetails);
router.get('/getCompanyDetails',UserAuth(),companyController.getDetails);
router.post('/deleteCompany/:id', UserAuth(), validate(companyServiceValidation.validateDeleteCompany), companyController.deleteCompany);
router.post('/postJob/:id', UserAuth(), validate(companyServiceValidation.validateJobDetails), companyController.postJob);



module.exports = router;
