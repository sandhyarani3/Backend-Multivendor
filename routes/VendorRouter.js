const VendorController=require("../controllers/VendorController");


const express=require("express");
const router=express.Router();
router.post("/register",VendorController.vendorRegister);//api
router.post("/login",VendorController.vendorLogin);
router.get("/all-vendors",VendorController.getAllVendors);
router.get("/single-vendor/:id",VendorController.getVendorById);
module.exports=router