const Product = require("../models/product");
const Category = require("../models/category");
const {Op} = require("sequelize");


exports.productCategory = async function(req, res) {
    const id = req.params.categoryid;
    try {
        const products = await Product.findAll({
         
            where:{
               categoryId:id
            },raw:true
        });
        console.log(products);
        const categories = await Category.findAll({ raw: true });

        res.render("users/products", {
            title: "Mükemmeller",
            products: products,
            categories: categories,
            selectedCategory: id
        })
        console.log(products);
    }
    catch(err) {
        console.log(err);
    }
}
exports.products_details = async function(req,res){
    const id = req.params.productid;
    try{
        const product = await Product.findOne({
            where:{
                id:id
            },
            raw:true
        });
        if(product){
            return res.render("users/product-detail",{
                title:product.name,
                product:product
            });
        }
        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
}
exports.index = async function(req,res){
    try{
        const products = await Product.findAll({raw:true});
        const categories = await Category.findAll({raw:true});
        res.render("users/index", {
            title: "Popüler Ürüler",
            products: products,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err)
    {
        console.log(err);
    }
}