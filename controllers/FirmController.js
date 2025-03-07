const Firm=require("../models/Firm");
const Vendor=require("../models/Vendor");
const multer=require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save in "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +path.extname( file.originalname)); // Generate a unique filename
    },
  });
  
  const upload = multer({ storage: storage });


const addFirm=async(req,res)=>{
    try{
    const{firmName,area,category,region,offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    const vendor=await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(404).json({message:"vendor not found"});
    }
    const firm=new Firm({
        firmName,area,category,region,offer,image,vendor:vendor._id
    })
    const savedfirm=await firm.save();
    vendor.firm.push(savedfirm);
    await vendor.save();
    res.status(201).json("Firm added successfully")
    }
    catch(error){
        console.log(error);
      res.status(401).json("internal server error");
    }
}
const deleteFirmById=async(req,res)=>{
  try{
  const firmId=req.params.firmId;
  const deletedFirm=await Firm.findByIdAndDelete(firmId);

  if(!deletedFirm)return res.status(404).json({error:"firm not found"});
  return res.status(201).json(" Firm deleted successfully");
  }
  catch(error){
   console.log(error);
   return res.status(501).json("Internal server error");
  }
}
//single image
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}


