const mongoose = require("mongoose");
const Post = require("./../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const data = req.body;
    data.userName = req.user.name;
    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userName !== req.user.name)
    return res.status(401).json({
      status: "fail",
      message: "User not authorized",
    });
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userName !== req.user.name)
    return res.status(401).json({
      status: "fail",
      message: "User not authorized",
    });
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.handleLiking = async (req, res) => {
  const query = { _id: req.params.id };
  const update1 = {
    $pull: { likings: { user: req.user._id } },
  };
  const update2 = {
    $push: { likings: { user: req.user._id, val: req.body.val } },
  };
  try {
    await Post.updateOne(query, update1);
    await Post.updateOne(query, update2);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getLikings = async (req, res) => {
  let likes = 0;
  let dislikes = 0;
  documentId = new mongoose.Types.ObjectId(req.params.id);
  try {
    const result1 = await Post.aggregate([
      {
        $match: {
          _id: documentId,
        },
      },
      {
        $unwind: "$likings",
      },
      {
        $match: {
          "likings.val": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          count: { $sum: 1 },
        },
      },
    ]);

    if (result1.length > 0) {
      likes = result1[0].count;
    }

    const result2 = await Post.aggregate([
      {
        $match: {
          _id: documentId,
        },
      },
      {
        $unwind: "$likings",
      },
      {
        $match: {
          "likings.val": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          count: { $sum: 1 },
        },
      },
    ]);

    if (result2.length > 0) {
      dislikes = result2[0].count;
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
  

  res.status(200).json({
    status: "success",
    data: [likes, dislikes],
  });
};

exports.likingValue = async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.id);
    const post = await Post.findOne({ _id: postId }).select("likings");
    const val = post.likings.find((item) => String(item.user) == String(req.user._id)).val;
    res.status(200).json({
      status: "success",
      data: val,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
}
