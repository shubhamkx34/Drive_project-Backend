const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const fileModal = require("../models/files.model");
const authMiddleware = require("../middlewares/auth"); //Just responsible for checking if user is logged-in or not
const https = require("https");

router.get("/home", authMiddleware, async (req, res) => {
  //prints details of uploaded user's files in console
  const userFiles = await fileModal.find({
    user: req.user.userId,
  });
  console.log(userFiles);

  res.render("home", {
    files: userFiles,        //helps to render the uploaded documents list on uploads page
  });
});

//upload.single('file'):takes file from the user's computer and pushes it up to Cloudinary's servers.
router.post( "/upload", authMiddleware,upload.single("file"),async (req, res) => {
   
  // Save to MongoDB after successful Cloudinary upload
    const newFile = new fileModal({
      path: req.file.path, // Cloudinary URL ["WHERE is the file?"]
      originalname: req.file.originalname, //["WHAT is the file called?" (e.g., "vacation.jpg")]

      //["WHO owns this file?" (e.g., John)] ; This field is derived from the token in the browser's cookies using auth middleware
      user: req.user.userId,
    });

    await newFile.save();
    res.send(req.file);
  },
);

//TO Download the uploaded documents ->
router.get("/download", authMiddleware, async (req, res) => {
  
  //First To match userid of the uploaded file for authentication
  const loggedInUserId = req.user.userId
  const file = await fileModal.findOne({
    user: loggedInUserId
  })
  if(!file){
    return res.status(401).json({
      message:'Unauthorized'
    })
  }
  
  
  
  const fileUrl = req.query.path;
  const filename = req.query.name;
  // Tell browser to download, not open
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  // Stream file from Cloudinary to browser
  https.get(fileUrl, (stream) => {
    stream.pipe(res);
  });
});

module.exports = router;
