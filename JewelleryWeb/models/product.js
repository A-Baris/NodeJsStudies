const {DataTypes}=require("sequelize");
const sequelize = require("../data/db");

const Product = sequelize.define("product",{

    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gram:{
        type:DataTypes.DECIMAL(5,2),
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

},{
    timestamps:true
});

module.exports = Product;