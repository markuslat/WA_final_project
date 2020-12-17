var express = require("express");
var router = express.Router();

// Rendering signUp.js (sign up view)
router.get("/", function (req, res, next) {
  res.render("signUp", { title: "MICROJUNK" });
});

module.exports = router;
