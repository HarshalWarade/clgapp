const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
  ],
  blogCreatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Blog = mongoose.model("BLOG", blogSchema);

module.exports = Blog;
