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

const getStudentDetails = async (userId) => {
  console.log('getStudentDetails',userId)
  const result = await StudentModel.find({ user: userId })
  return {data:result,code:CONSTANT.SUCCESSFUL,message:"User Details"};

}

const getAllAppliedJobs = async (userId) => {
  const result = await StudentModel.find({ user: userId });
  return { data: result, code: CONSTANT.SUCCESSFUL, message: CONSTANT.JOB_LIST}
}
const applyForJob = async (userId,role,amountSpent) => {
  const result = await StudentModel.findByIdAndUpdate(userId, {
    $push: {
      appliedJobs: {
        role: role, // Reference the job
        amountSpent: amountSpent, // Default amount spent (can be modified based on your logic)
      },
    },
    new: true, // Return the updated document
  });
  return {data:result,code:CONSTANT.SUCCESSFUL,message:"Applied for job successfully"}
}



module.exports = { addStudentDetails,getAllAppliedJobs,applyForJob,getStudentDetails };

