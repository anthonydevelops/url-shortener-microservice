const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  original_url: {
    type: String,
    trim: true,
    required: true
  },
  short_url: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
