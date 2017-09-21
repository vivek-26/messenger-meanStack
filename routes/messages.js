/**
 * @author Vivek Kumar
 * 
 * This file contains all messages related route
 */
var express = require('express');
var router = express.Router();

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

router.get('/', catchAsyncErrors(async function (req, res, next) {
   let messages = await Message.find().exec();
   return res.status(200).json({
      message: 'Successfully fetched messages!',
      resource: messages
   });
}));

router.post('/', catchAsyncErrors(async function (req, res, next) {
   let message = new Message({
      content: req.body.content
   });

   let result = await message.save();
   return res.status(201).json({
      message: 'Successfully saved message!',
      resource: result
   });
}));

module.exports = router;