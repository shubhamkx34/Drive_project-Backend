const mongoose = require("mongoose"); //mongoose -a tool that makes talking to MongoDB easier

//connection btw node.js and mongodb [The production way]
function connectToDB(){
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Node connected to DB")
  });
}


//exports so other files can use it.
module.exports = connectToDB;   





/*During production we dont write url directly, we make enviornmental variable (.env)
.env file is a secure file, holds all the secrets of the application , mongoDB connection is secret ,ejs,jwt etc


*/