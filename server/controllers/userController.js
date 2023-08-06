const User = require("./../models/userModel");

exports.getUser = async(req, res) => {
    const user = await User.findOne({ name: req.params.username });
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ status: "fail", message: "User not found" });
    }
};
exports.createUser = (req, res) => {};

exports.usernameExists = async (req, res) => {
  const user = await User.findOne({ name: req.body.username });
  if (user) {
    res
      .status(205)
      .json({ status: "fail", message: "Username already exists" });
  } else {
    res.status(200).json({ status: "success" });
  }
};
