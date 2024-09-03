const authCheckTrue = (req, res, next) => {
  if (req.user) {
    res.redirect("/main/home");
  } else {
    next();
  }
};

module.exports = authCheckTrue;
