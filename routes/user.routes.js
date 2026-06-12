const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//To render register.ejs to frontend from server
router.get("/register", (req, res) => {
  res.render("register");
});

//To get data from frontend to server
router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }
    res.send(errors);
  })
/*To get data from frontend to server
router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("User Registered!");
});  */

module.exports = router;
