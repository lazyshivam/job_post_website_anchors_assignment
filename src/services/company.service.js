// const {UserCart} =require('../models');
const { User, CompanyModel,JobModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const { sendTicketConfirmationEmail, sendTicketReplyEmail } = require('../helpers/mailFunctions');
const CONSTANT = require('../config/constant');



const addCompanyDetails = async (companyDetails,userId) => {

    const details = {
        user: userId,
        ...companyDetails
    }
    const result = await CompanyModel.create(details);

    return {data:result,code:CONSTANT.SUCCESSFUL,message:CONSTANT.COMPANY_DETAILS};

}

const getCompanyDetailsById = async (userId) => {
      
    const result = await CompanyModel.find({user:userId}).populate('postedJobs.role');

    return {data:result,code:CONSTANT.SUCCESSFUL,message:CONSTANT.GET_COMPANY_DETAILS};

}


const deleteCompanyDetails = async (companyId) => {
    console.log(companyId)
    const deletedService = await CompanyModel.findOneAndDelete({ _id: companyId },
        { new: true}
    );
  
    if (!deletedService) {
      return { data: [], code: CONSTANT.BAD_REQUEST, message: CONSTANT.NOT_FOUND_MSG};
    }
  
    return { data: deletedService, code: CONSTANT.SUCCESSFUL, message: CONSTANT.COMPANY_DELETED };
}



const postJobDetails = async (jobDetails,companyId) => {
    console.log(companyId)
    const jobinfo = {
        company: companyId,
        ...jobDetails
        
    }
    const result = await JobModel.create(jobinfo);

  
    return { data: result, code: CONSTANT.SUCCESSFUL, message: CONSTANT.JOB_POSTED };
}

module.exports = { addCompanyDetails, getCompanyDetailsById,deleteCompanyDetails,postJobDetails };

