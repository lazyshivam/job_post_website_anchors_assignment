const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {  servicePlan, studentService } = require('../services');

const addStudent = catchAsync(async (req, res) => {
   
    const userId = req.user.id;
   
  const result = await studentService.addStudentDetails(req.body,userId);
  res.status(httpStatus.OK).send(result);
});





module.exports = {addStudent};