const { User, StudentModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const {  sendTicketConfirmationEmail, sendTicketReplyEmail } = require('./email.service');

const CONSTANT = require('../config/constant');

const addStudentDetails = async (userDetails,userId) => {
  const studentInfo = {
    user: userId,
    ...userDetails
  }
  const result = await StudentModel.create(studentInfo);

  return { data: result, code: CONSTANT.SUCCESSFUL, message: CONSTANT.STUDENT_ADDED };

}



module.exports = { addStudentDetails };

