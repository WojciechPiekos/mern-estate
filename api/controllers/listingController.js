const Listing = require("../models/Listing");
const { customError } = require("../utils/customError");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(customError(404, "Listing not found", req, res));
  }

  if (req.user.id !== listing.userRef) {
    return next(
      customError(401, "You can only delete your own listings!", req, res)
    );
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(customError(404, "Listing not found", req, res));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      customError(401, "You can only update your own litings!", req, res)
    );
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(customError(error.code,error.message,req,res));
  }
};

module.exports = {
  createListing,
  deleteListing,
  updateListing,
};
