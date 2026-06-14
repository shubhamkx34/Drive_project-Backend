const mongoose = require("mongoose");

const fileschema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "path is required"],
  },

  originalname: {
    type: String,
    required: [true, "original name is required"],
  },

  //which user owns this file -
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user is required"],
  },
});

const file = mongoose.model("file", fileschema);
module.exports = file;
