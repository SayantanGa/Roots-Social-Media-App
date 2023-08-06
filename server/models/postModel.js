const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now(),
  },
  userName: {
    type: String,
    required: true,
  },
  avatar: String,
  imgUrl: {
    type: String,
    default: null,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  likings: {
    type: Array,
    default: [{}]
  },
  comments: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postModel);

module.exports = Post;
