const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you are not logged");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.ownerListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.Userstatus._id)) {
    req.flash("error", "you are not the owner of this listing ");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
module.exports.ownerReviw = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.Userstatus._id)) {
    req.flash("error", "you are not the owner of this review ");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
