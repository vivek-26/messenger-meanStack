const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

var schema = new Schema({
   content: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   }
});

// Remove the deleted message from User's messages array
schema.post('remove', function (message) {
   User.findById(message.user, function (err, user) {
      user.messages.pull(message);
      user.save();
   });
});

// Export Message Model
module.exports = mongoose.model('Message', schema);