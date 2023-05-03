const User = require("../models/User");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

exports.registerUser = async (req, res, next) => {
  const newUser = new User({
    handle: req.body.handle,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong Credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "5d" }
    );
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
