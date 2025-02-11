console.log("hello world");
const express=require("express");
const dotEnv=require("dotenv");
const mongoose=require("mongoose");
const app=express();
const VendorRouter=require("./routes/VendorRouter");
const BodyParser=require("body-parser");
const FirmRoutes=require("./routes/FirmRoutes");
const ProductRoutes=require("./routes/ProductRoutes");
const path=require("path")//this path is inbulit module in nodejs
const port="5000";
dotEnv.config();//access data from .env file
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((err)=>{console.log(err)});//to connect with mongodb & process.env.MONGO_URL is to access value of MONGO_URL
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})
app.use('/home',(req,res)=>{
    res.send("<h1>welcome</h1>")
})
app.use(BodyParser.json())//to convert data coming VendorRoutes into json format
//to create http request we use middleware i.e use()
app.use("/vendor",VendorRouter);
app.use("/firm",FirmRoutes);
app.use("/product",ProductRoutes);
app.use("/uploads",express.static("uploads"));//express.static("uploads")=>images saves in uploads