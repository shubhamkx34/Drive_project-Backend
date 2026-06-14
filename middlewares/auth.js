//THIS AUTH MIDDLEWARE IS RESPONSIBLE TO GET THE DETAILS OF THE USER  USING DECODED VARIABLE FROM THE TOKEN WHERE USER SAVED ITS USERNAME,USERID AND EMAIL.

const jwt = require("jsonwebtoken");

//custom middleware - checks if user is logged in or not .
//aunthentication for this document upload page will be entirely based on tokens
function auth(req, res, next) {
  const token = req.cookies.token;

  //if there is no token present , then user never logged in or even have not registered yet
  if (!token) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  //if token is present , then to verify it , if its genuine or not bcz token can be tampered ; to do so we use try and catch

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  //If token matches then , all the fields will be made present in decoded , means token is fine.
     return next();
  } 
  catch (err) {   //if token is tampered
    return res.status(401).json({
      message: "unauthorised",
    });
  }
}

module.exports = auth;