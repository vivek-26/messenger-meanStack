/**
 * @author Vivek Kumar
 * 
 * This file contains all user related route
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

// Route to signin a user
router.post('/signin', catchAsyncErrors(async function (req, res, next) {
   let user = await User.findOne({ email: req.body.email });
   if (!user) {
      return res.status(401).json({
         title: 'Login Failed!',
         error: 'Invalid login credentials!'
      });
   }
   if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
         title: 'Login Failed!',
         error: 'Invalid login credentials!'
      });
   }
   let token = jwt.sign({ user }, 'secret', { expiresIn: 7200 });
   return res.status(200).json({
      message: 'Successfully logged in!',
      token: token,
      userId: user._id
   });
}));

module.exports = router;