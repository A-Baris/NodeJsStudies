const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser=require('cookie-parser');
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:"MyWeb",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60*60*24
    }
}));

const path = require("path");
const routesOfUser = require("./routes/user");
const routesOfAdmin = require("./routes/admin");
const routesOfAuth = require("./routes/auth");
// const Product = require("./models/product");
// const Category = require("./models/category");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", routesOfAdmin);
app.use("/account",routesOfAuth);
app.use(routesOfUser);




const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data"); 
const Category = require("./models/category");
const Product = require("./models/product");
const User = require("./models/user");

Product.belongsTo(Category);
Category.hasMany(Product);

// Product.belongsToMany(Category,{through:productCategories});
// Category.belongsToMany(Blog, { through: "productCategories"});

(async () => {
    // await sequelize.sync({ force: true });
    // await dummyData();
})();


app.listen(4000, function() {
    console.log("listening on port 4000");
});