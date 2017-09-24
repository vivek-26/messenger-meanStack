/**
 * @author Vivek Kumar
 * 
 * This file contains all messages related route
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Import Message Mongoose Model
var Message = require('../models/message');

// Function to catch errors in async routes
function catchAsyncErrors(fn) {
   return (req, res, next) => {
      const routePromise = fn(req, res, next);
      if (routePromise.catch) {
         routePromise.catch(err => next(err));
      }
   }
}

// Route to get all messages
router.get('/', catchAsyncErrors(async function (req, res, next) {
   let messages = await Message.find().exec();
   return res.status(200).json({
      message: 'Successfully fetched messages!',
      resource: messages
   });
}));

// Middleware to check if valid JWT token is received
router.use('/', async function (req, res, next) {
   try {
      let decoded = await jwt.verify(req.query.token, 'secret');
      next();
   } catch (err) {
      return res.status(401).json({
         title: 'Authentication Failed!',
         error: err.message
      });
   }
});

// Route to add a new message
router.post('/', catchAsyncErrors(async function (req, res, next) {
   let decoded = jwt.decode(req.query.token);
   let user = await User.findById(decoded.user._id);
   let message = new Message({
      content: req.body.content,
      user: user
   });

   let result = await message.save();
   user.messages.push(result);
   await user.save();
   return res.status(201).json({
      message: 'Successfully saved message!',
      resource: result
   });
}));

// Route to update an existing message
router.patch('/:id', catchAsyncErrors(async function (req, res, next) {
   let message = await Message.findById(req.params.id);
   if (!message) {
      return res.status(404).json({
         title: 'An error occurred!',
         error: `Could not find any message with id - ${req.params.id}`
      });
   }
   message.content = req.body.content;
   let result = await message.save();
   return res.status(200).json({
      message: 'Successfully updated message!',
      resource: result
   });
}));

// Route to delete an existing message
router.delete('/:id', catchAsyncErrors(async function (req, res, next) {
   let message = await Message.findById(req.params.id);
   if (!message) {
      return res.status(404).json({
         title: 'An error occurred!',
         error: `Could not find any message with id - ${req.params.id}`
      });
   }

   let result = await message.remove();
   return res.status(200).json({
      message: 'Successfully deleted message!',
      resource: result
   });
}));

module.exports = router;