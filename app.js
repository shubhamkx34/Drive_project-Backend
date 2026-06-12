const express = require("express");
const userRouter = require("./routes/user.routes")

const dotenv = require("dotenv")
dotenv.config()
const connectToDB = require('./config/db')
connectToDB()

const app = express();
app.set("view engine", "ejs");
app.use(express.json());   //to solve undefined console output when using post method
app.use(express.urlencoded({ extended: true }));   //to solve undefined console output when using post method

app.use('/user',userRouter)

app.listen(3000, () => {
  console.log("Express running on 3000 port");  //callback
});
