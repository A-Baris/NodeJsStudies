const Category = require("../models/category");
const Product = require("../models/product");
async function populate(){
    const count = await Category.count();
    if(count==0){
        const categories = await Category.bulkCreate([
            {name:"Zincir"},
            {name:"Yüzük"},
            {name:"Bileklik"},
        ])
        const blogs = await Product.bulkCreate([
            {
                name:"Omega",
                gram:11.40,
                description:"55 cm yeşil",
                image:"1.jpg"
            },
            {
                name:"Üç renk",
                gram:3.40,
                description:"Üç renk",
                image:"1.jpg"
            },
            {
                name:"Hallow",
                gram:7.65,
                description:"19.5 cm rose",
                image:"1.jpg"
            }


    ])
    }
}
module.exports = populate;