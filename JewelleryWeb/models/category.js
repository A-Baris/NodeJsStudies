const {DataTypes}=require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category",{
    categoryId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    }


},{
    timestamps:false
});
async function sync(){
    await Category.sync({force:true});
    console.log("Category tablosu eklendi");
    }
    sync();

module.exports = Category;