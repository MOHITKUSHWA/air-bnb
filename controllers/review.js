const Listing = require("../models/listing.js"); //listing Schema
const Review = require("../models/review.js"); //require a review models


module.exports.create = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "rivew added ..");
    res.redirect(`/listing/${listing._id}`);
  }

module.exports.delete =  async (req, res) =>{
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "rivew deleted...");
    res.redirect(`/listing/${id}`);
  }
