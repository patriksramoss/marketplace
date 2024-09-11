const authCheckTrue = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized access. Please log in." })
      .redirect("/login");
  }
};

module.exports = authCheckTrue;
