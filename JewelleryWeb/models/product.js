const {DataTypes}=require("sequelize");
const sequelize = require("../data/db");

const Product = sequelize.define("product",{
    productId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gram:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true,

    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    
    }

});
async function sync(){
await Product.sync({force:true});
console.log("Product tablosu eklendi");
}
sync();
module.exports = Product;