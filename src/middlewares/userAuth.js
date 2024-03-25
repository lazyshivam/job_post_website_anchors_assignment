const config = require('../config/config');
const jwt = require('jsonwebtoken');
const CONSTANT = require('../config/constant');
const User =require('../models/auth.model')

const UserAuth = () => async (req, res, next) => {
  var bearerToken;
  console.log("here i am")
  var bearerHeader = req.headers["authorization"] || req.query["api_key"];
  //console.log("bearerHeader",bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    console.log("bearerToken", bearerToken);
    jwt.verify(bearerToken, config.jwt.secret, function (err, decoded) {
      (async () => {
        var details = await User.findOne({ _id: decoded.sub });
      
        if (err) {
          console.log('Tokent err', err)
          return res.send({ code: CONSTANT.UNAUTHORIZED, message: 'Invalid Token!' });
        }
       
        req.user = details;
        next();
      })();
    });
  } else {
    return res.send({ code: CONSTANT.UNAUTHORIZED, message: CONSTANT.NO_TOKEN });
  }
};

module.exports = UserAuth;
