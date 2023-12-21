const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const path = require("path");
const routesOfUser = require("./routes/user");
const routesOfAdmin = require("./routes/admin");
// const Product = require("./models/product");
// const Category = require("./models/category");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", routesOfAdmin);
app.use(routesOfUser);
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data"); 
const Category = require("./models/category");
const Product = require("./models/product");

Product.belongsTo(Category);

// Product.belongsToMany(Category,{through:productCategories});
// Category.belongsToMany(Blog, { through: "productCategories"});

// (async () => {
//     await sequelize.sync({ alter: true });
//     await dummyData();
// })();


app.listen(4000, function() {
    console.log("listening on port 4000");
});