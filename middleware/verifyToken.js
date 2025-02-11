const jwt=require("jsonwebtoken");
const Vendor=require("../models/Vendor");
const dotEnv=require("dotenv");
dotEnv.config();
const secretKey=process.env.whatismyname;
const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({error:"Token is required"})
    }
    try {
        //this function verify token and returns payload
        //payload contains vendorId
        const decoded= jwt.verify(token,secretKey)
        //decoded.vendorId extracts vendorId from decoded token
        //and check if it exists in db
        const vendor=await Vendor.findById(decoded.vendorId);
        //if no vendor found
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        //the vendor id is stored in req
        req.vendorId=vendor._id;
        //if all the becomes true this next function executes
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"Invalid token"})
    }
}
module.exports=verifyToken