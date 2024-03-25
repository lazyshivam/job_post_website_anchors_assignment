const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const companyService=require('../services/company.service');

const addDetails = catchAsync(async (req, res) => {

  const result = await companyService.addCompanyDetails(req.body,req.user.id);
  res.status(httpStatus.CREATED).send(result);
});

const getDetails = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await companyService.getCompanyDetailsById(user.id);
    res.status(httpStatus.OK).send(result);
});



const deleteCompany = catchAsync(async (req, res) => {
    const companyId = req.params.id;
    const deletedResult = await companyService.deleteCompanyDetails(companyId);

    res.status(httpStatus.OK).send(deletedResult);
});
const postJob = catchAsync(async (req, res) => {
    const companyId = req.params.id;
    const result = await companyService.postJobDetails(req.body,companyId);

    res.status(httpStatus.OK).send(result);
});





module.exports = {deleteCompany,getDetails,addDetails,postJob};