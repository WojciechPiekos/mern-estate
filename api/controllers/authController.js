const bcrypt = require("bcrypt");
const User = require("../models/User");
const errorHandler = require("../middleware/errorHandler");



const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fileds are required",
    });
  }

  /*const duplicateUsername = await User.findOne({ username }).exec();
  if (duplicateUsername) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateEmail) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }*/

  const hashedPwd = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPwd });
  await newUser
    .save()
    .then(() => {
      res.status(201).json({
        message: "New user has been created",
      });
    })
    .catch((error) => {
      errorHandler(error,req,res,next)
    });
};

module.exports = {
  signup,
};
