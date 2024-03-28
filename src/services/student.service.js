const {StudentModel, CompanyModel } = require('../models');
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


// const applyForJob = async (userId,role,amountSpent) => {
//   const result = await StudentModel.findByIdAndUpdate(userId, {
//     $push: {
//       appliedJobs: {
//         role: role, // Reference the job
//         amountSpent: amountSpent, // Default amount spent (can be modified based on your logic)
//       },
//     },
//     new: true, // Return the updated document
//   });
//   return {data:result,code:CONSTANT.SUCCESSFUL,message:"Applied for job successfully"}
// }
const applyForJob = async (userId,companyId, role, requiredRupees) => {
  // Fetch student details to check rupees balance
  const student = await StudentModel.findOne({user:userId});

  if (!student) {
    return {data:[] ,code: CONSTANT.NOT_FOUND, message: 'Student not found' };
  }
  const company = await CompanyModel.findById({ _id: companyId });
  
  if (!company) {
    return {data:[] ,code: CONSTANT.NOT_FOUND, message:"Company not found" };
  }
  // Check if the student has enough rupees
  if (student.rupees < requiredRupees) {
    return { code: CONSTANT.BAD_REQUEST, message: "Oops! You don't have enough balance" };
  }

  // Deduct required rupees from the student's account
  student.rupees -= requiredRupees;
  // Calculate cashback
  const cashback = requiredRupees / 5;
  student.rupees += cashback;

  // calculating the to be paid to company
  const moneyToCompany = requiredRupees / 2;

  company.rupees += moneyToCompany;

  student.transactionHistory.push({
    type: 'debited',
    amount: requiredRupees,
    reason: `Applied  a job role ${role} in ${company.name}`,
  });
  company.transactionHistory.push({
    type: 'credited',
    amount: moneyToCompany,
    reason: 'Student has applied for new job role',
});
  await student.save();
  await company.save();

  return { data: [], code: CONSTANT.SUCCESSFUL, message: "Applied for job successfully" };
};



module.exports = { addStudentDetails,getAllAppliedJobs,applyForJob,getStudentDetails };

