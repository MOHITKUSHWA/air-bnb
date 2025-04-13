const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middelwear");
const userController = require('../controllers/user.js');
const Passport = require("passport");

router.get("/signup", userController.signupUser );

router.post(
  "/signup",
  wrapAsync(userController.newUser)
);

router.get("/login", userController.loginForm);

router.post(
  "/login",
  saveRedirectUrl,  
  Passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(userController.userLogin)
);

router.get("/logout",userController.logoutUser);

module.exports = router;
