const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    date:{
        type:Date,
        default:Date.now
    }
    });

    module.exports=mongoose.model("Product",productSchema);