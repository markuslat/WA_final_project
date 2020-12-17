var express = require("express");
var router = express.Router();

/*GET home page. */
router.get("/", function (req, res, next) {
  // Retreiving the posts from the global var
  var post_list = req.app.get("poststore");

  res.render("index", {
    title: "MICROJUNK",
    post_list: post_list
  });
});

/*GET sign up page. */
router.post("/getin", function (req, res, next) {
  res.redirect("/signup");
});

module.exports = router;
