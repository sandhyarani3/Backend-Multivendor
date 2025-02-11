const Product=require("../models/Product");
const multer=require("multer");
const Firm=require("../models/Firm");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save in "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +Path2D.extname( file.originalname)); // Generate a unique filename
    },
  });
  
  const upload = multer({ storage: storage });

const addProduct=async(req,res)=>{
    try {
        const{productName,price,category,description,Bestseller}=req.body;
        const image=req.file?req.file.filename:undefined;
        
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});
        }
        const product=new Product({
            productName,price,category,description,Bestseller,image,firm:firm._id
        })
        const savedProduct=await product.save();
        firm.product.push(savedProduct);
        await firm.save();
        res.status(201).json(savedProduct)
    } catch (error) {
        console.log(error);
        return res.status(401).json("Internal server error")
    }
}
const getProductByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});
        }
        const restuarantName=firm.firmName;
        const products=await Product.find({firm:firmId})
        //the above find all the products which have specific firmid in their firm array
        return res.status(201).json({restuarantName,products});
    } catch (error) {
        console.log(error);
        return res.status(501).json("internal server error");
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deletedProduct=await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({error:"product not found"});
        }
        return res.status(201).json("product deleted successfully");
    }
    catch(error){
      console.log(error);
      res.status(501).json("Internal server error")
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}