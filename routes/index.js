// Author: Markus Latvakoski
// Web applications final project

//////////////////////////////////////////////////////////

var express = require("express");
var router = express.Router();

// Rendering index.js (log in view)
router.get("/", function (req, res, next) {
  var post_list = req.app.get("poststore");

  res.render("index", {
    title: "MICROJUNK",
    post_list: post_list
  });
});

// GET sign up page
router.post("/getin", function (req, res, next) {
  res.redirect("/signup");
});

module.exports = router;
