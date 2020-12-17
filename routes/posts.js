// Required libraries
var express = require("express");
var router = express.Router();
var loggeduser;

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts listing
router.get("/", function (req, res, next) {
  // Retreiving the posts from the global var
  var data = req.app.get("poststore");

  // Just send the array of objects to the browser
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
  var local_content = req.body.content;
  var local_author = loggeduser;
  var date = new Date();
  var hour = date.getHours() + 2;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var tunti = String(hour);

  if (tunti === "24") {
    hour = "00";
  }
  if (tunti === "25") {
    hour = "01";
  }
  var minuutti = String(minute);

  if (minuutti.length === 1) {
    minute = "0" + minuutti;
  }

  var sekuntti = String(second);

  if (sekuntti.length === 1) {
    second = "0" + sekuntti;
  }

  var time = hour + ":" + minute;
  var date1 = day + "." + month + "." + year;

  console.log("We got content: " + local_content);
  console.log("from author: " + local_author);
  console.log("Time: " + time, date1);

  if (local_content.length <= 280) {
    if (local_content !== "") {
      req.app.get("poststore").unshift({
        author: local_author,
        content: local_content,
        time: time,
        date: date1
      });
      console.log("Post added.");

      res.redirect("/posts");
    }
  } else {
    console.log("Post was too long.");
  }
});

router.post("/logout", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  res.redirect("/");
});

router.post("/login", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var users = req.app.get("userstore");
  var local_user = req.body.loginuser;
  var local_password = req.body.loginpassword;
  var counter = 0;

  for (var i = 0; i < users.length; i++) {
    console.log(users[i].user);
    if (users[i].user === local_user) {
      if (users[i].pass === local_password) {
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
    console.log(local_user + " Logged in");
  }
});

router.post("/signup", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var local_user = req.body.signupuser;
  var local_password = req.body.signuppassword;

  if (local_user && local_password !== "") {
    console.log(local_user + " signed up.");
    req.app.get("userstore").push({
      user: local_user,
      pass: local_password
    });
    res.redirect("/");
  } else {
    console.log("Fill all fields.");
    res.redirect("/signup");
  }
});

module.exports = router;
