const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto", // allows images, videos, pdfs, etc.
    unique:"true"
  },
});

const upload = multer({ storage });
module.exports = upload;
