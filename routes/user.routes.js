const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModal = require("../models/user");
const jwt = require("jsonwebtoken");


/*FORM RELATED FRONTEND-SERVER INTERACTION  */
//To render register.ejs to frontend from server
router.get("/register", (req, res) => {
  res.render("register");
});

//To get data from frontend to server
router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 6 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, email, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10); //bcrypt for password safety
    const newUser = await userModal.create({
      username: username,
      email: email,
      password: hashpass,
    });

    res.json(newUser); //json is used as medium in industry for data tranfer btw frontend , server etc
  },
);

/*LOGIN AND AUTHENTICATION RELATED FRONTEND-SERVER INTERACTION  */

//To render login.ejs to frontend from server

router.get("/login", (req, res) => {
  res.render("login");
});

//To get data from frontend to server
router.post(
  "/login",
  body("password").trim().isLength({ min: 6 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    //Now checking the database of the user who is trying to login ,if it is saved or not as a registered user

    const { username, password } = req.body;

    const user = await userModal.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).json({
        message: "Username or Password is incorrect", //checking username if it matches or not
      });
    }

    const ismatch = await bcrypt.compare(password, user.password); //checking req.body password and stored password in database
    if (!ismatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    //Jsonwebtoken
    //If password and username both matches , then token is generated and stored in form of cookies in the browser ,which helps to know if a user is logged in or not
    const token = jwt.sign(
      {
        userId: user._id, //1st parameter are all the fields in these token that are called payloads
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET, //2nd parameter is secret key stored on .env secure  file
    );


    //Token created , now storing it on cookies

    res.cookie('token',token) 
    res.send('Logged in')   //'token is the name of cookie and value is token here 
  },
);

module.exports = router;
