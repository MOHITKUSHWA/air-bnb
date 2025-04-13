const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    let list = await Listing.find({});
    res.render("./listings/index.ejs", { list });
}

module.exports.newForm = async (req, res) => {
    res.render("./listings/post.ejs");
}

module.exports.listingShow = async (req, res) => {
    let { id } = req.params;
    const detail = await Listing.findById(id)
      .populate({ path: "review", populate: { path: "author" } })
      .populate("owner");
    if (!detail) {
      req.flash("error", "listing not exist");
      res.redirect("/listing");
    }
    res.render("./listings/show.ejs", { detail });
  }

module.exports.listingPost = async (req, res, next) => {
    let url = req.file.path;
    let filename =req.file.filename; 
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image= {url , filename};
    await newListing.save();
    req.flash("success", "New Listing Create");
    res.redirect("/listing");
}

module.exports.listingEdit = async (req, res, next) => {
  let { id } = req.params ;
  let editListing = await Listing.findById(id);
  res.render('./listings/edit.ejs' , { editListing })  ;
}

module.exports.listingUpdate = async (req, res) => {
    let {id} = req.params;
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing });
    if(typeof req.file !== 'undefined' ){
      
      listing.image = {url , filename};
      await listing.save();
    }

    req.flash("success", "Listing Updated..");
    res.redirect(`/listing/${id}`);
}

module.exports.listingDelete =async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listing");
  }