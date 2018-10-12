const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
