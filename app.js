const express = require("express");
const userRouter = require("./routes/user.routes")
const cookieParser = require("cookie-parser"); 
const indexRouter= require('./routes/index.routes')

const dotenv = require("dotenv")
dotenv.config()
const connectToDB = require('./config/db');

connectToDB()

const app = express();
app.set("view engine", "ejs");
app.use(express.json());   //to solve undefined console output when using post method
app.use(express.urlencoded({ extended: true }));   //to solve undefined console output when using post method
app.use(cookieParser())

app.use('/',indexRouter)         //Login & authentication page
app.use('/user',userRouter)     //register page


app.listen(3000, () => {
  console.log("Express running on 3000 port");  //callback
});
