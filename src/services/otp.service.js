const otpCache = {}; // Simple in-memory cache

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    return otp;
} 
// Function to store OTP sent to an email in the cache
const storeOTPSentToEmail = (email, otp) => {
  otpCache[email] = otp;
};

// Function to retrieve the OTP sent to an email from the cache
const getOTPSentToEmail = (email) => {
  return otpCache[email];
};

// Function to clear the OTP sent to an email from the cache after verification
const clearOTPSentToEmail = (email) => {
  delete otpCache[email];
};



module.exports = {
    generateOTP,
    storeOTPSentToEmail,
    getOTPSentToEmail,
    clearOTPSentToEmail
};