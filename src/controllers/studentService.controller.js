const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {  servicePlan, studentService } = require('../services');

const addStudent = catchAsync(async (req, res) => {
   
    const userId = req.user.id;
   
  const result = await studentService.addStudentDetails(req.body,userId);
  res.send(result);
});

const getStudentDetailsById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  
  const result = await studentService.getStudentDetails(userId);
  res.send(result);
});

const apply = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { role, amountSpent } = req.body;
  const result = await studentService.applyForJob(userId,role,amountSpent);
  res.send(result);
});

const getStudentApply = catchAsync(async (req, res) => {
  const userId = req.user.id;
 
  const result = await studentService.getAllAppliedJobs(userId);
  res.send(result);
});






module.exports = {addStudent,getStudentApply,getStudentDetailsById,apply};