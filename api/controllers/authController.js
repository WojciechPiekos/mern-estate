const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errorHandler = require("../middleware/errorHandler");
const { customError } = require("../utils/customError");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fileds are required",
    });
  }

  const hashedPwd = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPwd });

  try {
    await newUser.save();
    res.status(201).json({
      message: "New user has been created",
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email }).exec();
    if (!validUser) {
      return next(customError(404, "User not found", req, res));
    }
    const validPwd = bcrypt.compareSync(password, validUser.password);
    if (!validPwd) {
      return next(customError(401, "Wrong credentials", req, res));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json( rest );
  } catch (error) {
    errorHandler(err, req, res, next);
  }
};

const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json( rest );
    } else {
      const generatedPwd =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPwd = bcrypt.hashSync(generatedPwd, 10);

      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username,
        email,
        password: hashedPwd,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json( rest );
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

module.exports = {
  signup,
  signin,
  google,
};
