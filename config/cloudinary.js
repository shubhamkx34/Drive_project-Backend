//to install cloudinary admin here and then require
//npm install cloudinary - it connects express with cloudinary

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbyf0azgf",
  api_key: "551363772822645",
  api_secret: "VI-rsYG-9bukdOhol1jpGbwXf6k",
});

module.exports = cloudinary;