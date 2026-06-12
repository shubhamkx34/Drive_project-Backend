const mongoose = require("mongoose");

//first we have to create schema the formal blueprint defines how data is organized, stored, and related within a database
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long !"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, "Email must be at least 13 characters long !"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Password must be at least 6 characters long !"],
  },
  /* gender:{
            type:String,
            Enum:['male', 'female']
    }*/
});
//To implement this schema in actual database
const userModal = mongoose.model("user", userschema); //name of modal is user and will be made from userschema in 4th line

module.exports = userModal;