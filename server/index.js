require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth");
const contactRoute = require("./router/contact");
const connectToDB = require("./db");
const errorMiddleware = require("./middlewares/error-middleware");
const services = require("./controller/service-controller");
const adminRoute = require("./router/admin-router");
const path = require("path");
var MongoClient = require("mongodb").MongoClient;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);
app.use("/api/admin",adminRoute);

app.get("/",(req,res,next)=>{return res.status(200).json({success:true,message:"Hello Manish"})})


app.use(errorMiddleware);
// step2 hosting
const PORT = process.env.PORT ;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at post ${PORT}`);
  });
});
