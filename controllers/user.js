const User = require("../models/user");

module.exports.signupUser = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.newUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    let user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust");
      res.redirect("/listing");
    });
  } catch (error) {
    req.flash("error", "user is already registered !");
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.userLogin = async (req, res) => {
  req.flash("success", "welcome back your over said");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logout you out!");
    res.redirect("/listing");
  });
};
