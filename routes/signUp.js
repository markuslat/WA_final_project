var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("signUp", { title: "MICROJUNK" });
});

module.exports = router;
