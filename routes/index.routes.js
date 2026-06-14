const express = require('express')
const router = express.Router()
const upload = require('../config/multer.config')
const fileModal = require('../models/files.model')

router.get('/home',(req,res) => {
    res.render('home')
})

router.post("/upload", upload.single("file"), async (req, res) => {
  // Save to MongoDB after successful Cloudinary upload
  const newFile = new fileModal({
    path: req.file.path, // Cloudinary URL
    originalname: req.file.originalname,
    user: req.user._id, // whoever is logged in ; authorisation middleware must setup and fetch the 
  });

  await newFile.save();
  res.send(req.file);
});

module.exports=router
