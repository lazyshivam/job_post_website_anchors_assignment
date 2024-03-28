// const {UserCart} =require('../models');
const { User, CompanyModel,JobModel, authModel } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const { sendTicketConfirmationEmail, sendTicketReplyEmail } = require('../helpers/mailFunctions');
const CONSTANT = require('../config/constant');
const mailFunctions = require('../helpers/mailFunctions');

// Function to calculate rewards based on updated company details
function calculateRewards(profile) {
    let reward = 0;

    // Check each updated company detail and add corresponding rewards
    if (profile.name) reward += 25;
    if (profile.website) reward += 50;
    if (profile.teamSize) reward += 20;
    if (profile.logo) reward += 50;

    return reward;
}

const addCompanyDetails = async (companyDetails, userId) => {

    // // Create company profile with default values

    const defaultDetails = {
        user: userId,
        ...companyDetails
    };

     const company=await CompanyModel.create(defaultDetails);

    // // Calculate rewards based on updated details
    const rupeesEarned = calculateRewards(companyDetails);
    // console.log(rupeesEarned);
    const newTotalAmount = company.rupees + rupeesEarned;
    console.log(newTotalAmount);
    const updatedProfile = await CompanyModel.findByIdAndUpdate(
        { _id: company.id },
        {$set: {rupees: newTotalAmount}},
        { new: true });
    
    

    // Add transaction history for the reward
    updatedProfile.transactionHistory = [{
        type: 'credited',
        amount: rupeesEarned,
        reason: 'Reward for updating company details',
    }];

    // Save the updated profile
    await updatedProfile.save();
    // console.log(updatedProfile);
    return { data: updatedProfile, code: CONSTANT.SUCCESSFUL, message: CONSTANT.COMPANY_DETAILS };
    
};




const getCompanyDetailsById = async (userId) => {
      
    const result = await CompanyModel.find({ user: userId });

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



const postJobDetails = async (jobDetails, companyId) => {
    console.log(companyId);

    // Calculate Required Rupees (RR)
    const { jobRole, location } = jobDetails;
    const requiredRupees = 2 * jobRole.length + 5 * location.length;

    // Fetch company details to check rupees balance
    const company = await CompanyModel.findByIdAndUpdate(companyId);

    if (!company) {
        return {data:[], code: CONSTANT.NOT_FOUND, message: 'Company not found' };
    }

    // Check if the company has enough rupees
    if (company.rupees < requiredRupees) {
        return { code: CONSTANT.BAD_REQUEST, message: "Oops! You don't have enough rupees in the account" };
    }

    // Create job info
    const jobinfo = {
        company: companyId,
        ...jobDetails
    };

    // Create job
    const result = await JobModel.create(jobinfo);
    
    // Deduct required rupees from the company's account
    company.rupees -= requiredRupees;

    company.transactionHistory.push({
        type: 'debited',
        amount: requiredRupees,
        reason: 'For posting new job role',
    });
    await company.save();

    // Send email to notify successful job posting
    // sendEmail(company.email, `Congrats! You published a new job for ${jobRole}`);
    const user = await authModel.findOne({ _id: company.user });
    // console.log(user);
    await mailFunctions.sendCongratulationsEmail(user.email,jobRole);

    return { data: result, code: CONSTANT.SUCCESSFUL, message: CONSTANT.JOB_POSTED };
};


const getJobDetails = async (userId) => {
    // console.log(userId)
    const companyWithUserId = await CompanyModel.findOne({ user: userId._id });
    console.log(companyWithUserId)
    if (!companyWithUserId) {
        return {data:[],code:CONSTANT.BAD_REQUEST,message:CONSTANT.NOT_FOUND}
    }

    const result = await JobModel.find({company:companyWithUserId._id});
     
    // console.log(result);
    return { data: result, code: CONSTANT.SUCCESSFUL, message: CONSTANT.JOB_LIST };
}
const getAllJobDetails = async () => { 
    const result = await JobModel.find().populate('company','_id name website');
    return { data: result, code: CONSTANT.SUCCESSFUL,message:CONSTANT.JOB_LIST }; 
}
module.exports = { addCompanyDetails, getAllJobDetails,getCompanyDetailsById,deleteCompanyDetails,postJobDetails ,getJobDetails};

