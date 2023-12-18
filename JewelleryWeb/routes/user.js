const express = require("express");
const router = express.Router();
const db = require("../data/db");


router.use("/product/:productId", async function(req,res){
    const productId = req.params.productId;
    try{
        const [products, ] = await db.execute("select * from products where productId=?",[productId]);
        const product = products[0];
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

});

router.use("/", async function(req,res){
try{
    const [products, ] = await db.execute("select * from products");
    const [categories, ] = await db.execute("select * from categories");

    res.render("users/index",{
        title:"Unique Accessories",
        products : products,
        categories: categories,
        selectedCategory: null

    })


}
catch(err){
    console.log(err);
};

})

module.exports = router;