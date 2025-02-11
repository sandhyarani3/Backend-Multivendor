const mongoose=require("mongoose");

const firmSchema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
              type:String,
              enum:['veg','Non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['southIndian','northIndian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String,

    },
    image:{
        type:String,
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"vendor"//to create relationship with vendor
        }
    ],//this to create relationship b/w collections(models)
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})
const Firm=mongoose.model('Firm',firmSchema);
module.exports=Firm;