const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); //wrapAsynce function
const { isLoggedIn, ownerListing } = require("../middelwear.js"); //meiddelwears require
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// index  routes...

router.get("/", wrapAsync(listingControllers.index));

//create new postes....

router.get("/new", isLoggedIn, wrapAsync(listingControllers.newForm));

// show route created...
router.get("/:id", wrapAsync(listingControllers.listingShow));

//create post rauted...

router.post(
  "/",
  isLoggedIn, 
  upload.single("listing[image]"),
  wrapAsync(listingControllers.listingPost)
);

// edit requst pasted....
router.get(
  "/:id/edit",
  isLoggedIn,
  ownerListing,
  wrapAsync(listingControllers.listingEdit)
);

// update listing
router.put(
  "/:id",
  isLoggedIn,
  ownerListing,
  upload.single("listing[image]"),
  wrapAsync(listingControllers.listingUpdate)
);

// delete listings ....
router.delete(
  "/:id",
  ownerListing,
  isLoggedIn,
  wrapAsync(listingControllers.listingDelete)
);

module.exports = router;
