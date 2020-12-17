// Importing required libraries
var express = require("express");
var router = express.Router();
var loggeduser;
const { sanitizeBody } = require("express-validator");

// Rendering posts.pug view
router.get("/", function (req, res, next) {
  var data = req.app.get("poststore");
  res.render("posts", {
    title: "Post List",
    post_list: data
  });
});

// Sanitation middleware
router.post("/create", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var content = req.body.content;
  var author = loggeduser;
  var date = new Date();
  var minute = date.getMinutes();
  var hour = date.getHours() + 2;
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hour2 = hour;
  var minute2 = minute;

  // Fixing formations
  if (hour2 === 24) {
    hour = "00";
  }
  if (hour2 === 25) {
    hour = "01";
  }
  if (minute2 < 10) {
    minute = "0" + minute2;
  }
  var postingTime = hour + ":" + minute;
  var date2 = day + "." + month + "." + year;

  console.log(
    "New contentfrom author " +
      author +
      ":" +
      content +
      " Time: " +
      postingTime,
    date2
  );

  // Adding the post to the poststore
  if (content.length <= 280) {
    if (content !== "") {
      req.app.get("poststore").unshift({
        author: author,
        content: content,
        time: postingTime,
        date: date2
      });
      console.log("Post added.");

      res.redirect("/posts");
    }
  } else {
    console.log("Post was too long.");
  }
});

router.post("/signup", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var user = req.body.signupuser;
  var password = req.body.signuppassword;

  // Saving username and password to the userstore
  if (user && password !== "") {
    console.log(user + " signed up.");
    req.app.get("userstore").push({
      user: user,
      pass: password
    });
    res.redirect("/");
  } else {
    console.log("Fill all fields.");
    res.redirect("/signup");
  }
});

router.post("/login", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var users = req.app.get("userstore");
  var user = req.body.loginuser;
  var password = req.body.loginpassword;
  var counter = 0;

  // If username and password matches to the existing ones, the user is admitted
  for (var i = 0; i < users.length; i++) {
    console.log(users[i].user);
    if (users[i].user === user) {
      if (users[i].pass === password) {
        loggeduser = users[i].user;
        counter = 1;
      }
    }
  }

  if (counter === 0) {
    console.log("Password or username is incorrect.");
    res.redirect("/");
  } else {
    res.redirect("/posts");
    console.log(user + " Logged in");
  }
});

router.post("/logout", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  res.redirect("/");
});

module.exports = router;
