const ProductController=require("../controllers/ProductController");
const express=require("express");

const router=express.Router();
router.post("/add-product/:firmId",ProductController.addProduct)
router.get("/:firmId/products",ProductController.getProductByFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(_dirname,'--','uploads',imageName));
});
router.delete("/:productId",ProductController.deleteProductById);
module.exports=router;