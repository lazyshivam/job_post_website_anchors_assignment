const express = require('express');

const userRoute = require('./auth.route');
const companyRoute = require('./companyServices.route');
const studentRoute = require('./student.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  { path: '/user', route: userRoute },
  { path: '/company', route: companyRoute },
  {path:'/student', route: studentRoute}
  

];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
