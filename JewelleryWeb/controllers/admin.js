const Product = require("../models/product");
const Category = require("../models/category");
const {Op} = require("sequelize");
const fs = require("fs");


exports.post_product_edit = async function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const gram = req.body.gram;
    const description = req.body.description;

    let image = req.body.image;

    if(req.file) {
        image = req.file.filename;

        fs.unlink("./public/images/" + req.body.image, err => {
            console.log(err);
        });
    }
    try{
       let product = await Product.findOne({where:{id:id}});
       if(product)
       {
        product.name = name;
        product.gram=gram;
        product.description=description;
        product.image=image;
        await product.save();
        return res.redirect("admin/index");
        
       }
    }
    catch(err){
        console.log(err);
    }

}
exports.get_product_edit = async function (req,res){
    const productid=req.params.id;
    try{
    const product = await Product.findOne({where:{id:productid}});
    
    if(product){
        return res.render("admin/product-edit",{
            title:product.name,
            product:product
        });
    }
    res.redirect("admin/index");
    }
    catch(err){
        console.log(err);
    }
}
exports.post_product_create = async function(req,res){
    const name = req.body.name;
    const gram = req.body.gram;
    const description = req.body.description;
    const image = req.file.filename;
   

    try{
        await Product.create({
            name:name,
            gram:gram,
            description:description,
            image:image,
            categoryId:1
        });
        res.redirect("admin/index")
    }
    catch(err)
    {

        console.log(err);
    }
}
exports.get_product_create = async function(req,res){
 res.render("admin/product-create",{
    title:"Ürün Ekle"
 });

}
exports.index = async function(req, res) {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes:["name"]
            }
        });
          console.log(products);
        res.render("admin/index", {
            title: "Admin Panel",
            products: products,
        });
    } catch (err) {
        console.log(err);
    }
};