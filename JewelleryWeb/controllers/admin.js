const Product = require("../models/product");
const Category = require("../models/category");
const {Op} = require("sequelize");
const fs = require("fs");

exports.get_product_delete = async function(req,res){
    const productId = req.params.id;
    try{
        const product = await Product.findByPk(productId);
        console.log(product + "test");
        if(product){
            return res.render("admin/product-delete",{
                title:"delete product",
                product:product
            });
        }
        res.redirect("/admin/products");
    }
    catch(err){
        console.log(err);
    }
}
exports.post_product_delete= async function(req,res){
    const productId = req.body.productId;
    try{
        const product = await Product.findByPk(productId);
        if(product){
            await product.destroy();
            return res.redirect("/admin/products?action=delete");
        }
        res.redirect("/admin/products");
    }
    catch(err){
        console.log(err);
    }
}
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
    const category = req.body.category
   

    try{
        await Product.create({
            name:name,
            gram:gram,
            description:description,
            image:image,
            categoryId:category
        });
        res.redirect("admin/index")
    }
    catch(err)
    {

        console.log(err);
    }
}
exports.get_product_create = async function(req,res){
    const categories = await Category.findAll();
    console.log(categories + "test");
 res.render("admin/product-create",{
    title:"Ürün Ekle",
    categories:categories
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