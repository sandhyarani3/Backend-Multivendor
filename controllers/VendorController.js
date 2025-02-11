const Vendor=require("../models/Vendor.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const dotEnv=require("dotenv");

dotEnv.config();
const secretkey=process.env.whatismyname;
const vendorRegister=async(req,res)=>{
    const{username,email,password}=req.body;
    const VendorEmail=await Vendor.findOne({email});
    try{
        if(VendorEmail){
            return res.status(400).json("Email already exists");
        }
        const hashpassword=await bcrypt.hash(password,10);//this is an alogo runs for 10 times and provide hashed password
        //to save it //we create new instance of this vendor model
        const newVendor=new Vendor({
            username,
            email,
            password:hashpassword
        })
        newVendor.save();//stores in db
        return res.status(201).json({message:"New vendor Registered Successfully"});
    }
    catch(error){
       console.log(error);
       return res.status(500).json({error:"internal server error"});
    }
}
const vendorLogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const vendor=await Vendor.findOne({email});
        if(!email || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json("Invalid email or password");
        }
        const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"});
        console.log(`token:${token}`)

        return res.status(201).json({success:"Login successfull",token});
    }
    catch(error){
        console.log(error);
        return res.status(401).json("Internal error");
    }
}
const getAllVendors=async(req,res)=>{
    try{
       const vendors=await Vendor.find().populate('firm');
       res.json({vendors});
    }
    catch(error){
      console.log(error);
      res.status(401).json("Internal server error")
    }
}
const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(401).json("vendor not found");
        }
        return res.status(201).json({vendor})
    } catch (error) {
        console.log(error);
        return res.status(401).json("Internal server error")
    }
    

}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}