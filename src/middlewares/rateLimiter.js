const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 10000,
  max: 100,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
