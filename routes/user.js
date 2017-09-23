/**
 * @author Vivek Kumar
 * 
 * This file contains all user related route
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// Import USer Mongoose Model
var User = require('../models/user');

// Function to catch errors in async routes
function catchAsyncErrors(fn) {
   return (req, res, next) => {
      const routePromise = fn(req, res, next);
      if (routePromise.catch) {
         routePromise.catch(err => next(err));
      }
   }
}

// Route to signup a particular user
router.post('/', catchAsyncErrors(async function (req, res, next) {
   var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
   });

   let result = await user.save();
   return res.status(201).json({
      message: 'Successfully created user!',
      resource: result
   });
}));

module.exports = router;