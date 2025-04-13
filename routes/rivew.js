const express = require("express");
const raouter = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); //wrapAsynce function
const { isLoggedIn, ownerReviw} = require("../middelwear.js");
const reviewControllers = require("../controllers/review.js");

//review  edit in a list
raouter.post("/", isLoggedIn, wrapAsync(reviewControllers.create));

//delete review raout

raouter.delete(
  "/:reviewId",
  isLoggedIn,
  ownerReviw,
  wrapAsync(reviewControllers.delete)
);

module.exports = raouter;
