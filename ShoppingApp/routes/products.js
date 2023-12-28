const express = require("express");
const router = express.Router();
const Product = require("../models/product");



router.post("/addproduct",async (req,res)=>{
   const product = new Product({
    name:req.body.name,
    price:req.body.price,
    description:req.body.description
   });
   try{
    const result = await product.save();
    res.send(result);
   }
   catch(err){
    console.log(err);
   }

 
});

router.put("/:id",async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            price:req.body.price,
            description:req.body.description
        }
    },{new:true});
    res.send(product);
});
router.get("/", async (req, res) => {
    const products = await Product.find().select({price:1});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id:req.params.id});
    if (!product) {
        return res.status(404).send("ürün bulunamadı");
    }
    res.send(product);
});

module.exports = router;