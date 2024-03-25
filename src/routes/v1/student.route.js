const express = require('express');
const UserAuth = require('../../middlewares/userAuth');
const { studentServiceValidation } = require('../../validations');
const { studentController } = require('../../controllers');
const validate = require('../../middlewares/validate');


const router = express.Router();

router.post('/addDetails',UserAuth(),validate(studentServiceValidation.validateStudentDetails), studentController.addStudent);

module.exports = router;