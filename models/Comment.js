const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  message: { 
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Comment = mongoose.model('comment', CommentSchema);

// Export the Note model
module.exports = Comment;
