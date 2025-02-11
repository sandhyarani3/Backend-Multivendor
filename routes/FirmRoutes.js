const express=require("express");
const verifyToken=require("../middleware/verifyToken");
const FirmController=require("../controllers/FirmController");


const router=express.Router();
router.post("/add-firm",verifyToken,FirmController.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(_dirname,'--','uploads',imageName));
});
router.delete("/:firmId",FirmController.deleteFirmById)
module.exports=router;