const User = require("../models/User");
const { customError } = require("../utils/customError");
const bcrypt = require("bcrypt");
const Listing = require("../models/Listing")

const test = (req, res) => {
  res.json({
    message: "Odbyt mnie swędzi",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customError(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(customError(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res
      .status(200)
      .json({
        message: "User has been deleted!",
      })
  } catch (error) {
    next(error);
  }
};

const getUserListings = async(req,res,next) => {

  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({userRef: req.params.id})
      res.status(200).json(listings)
    } catch (error) {
      next(error)
    }
  } else {
    return next(customError(401, "You can only view your own listings!", req, res))
  }

}

module.exports = {
  test,
  updateUser,
  deleteUser,
  getUserListings,
};
