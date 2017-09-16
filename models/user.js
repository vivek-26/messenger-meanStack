const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
   }]
});

// For 'email' field's unique validation
schema.plugin(mongooseUniqueValidator);

// Export Message Model
module.exports = mongoose.model('User', schema);