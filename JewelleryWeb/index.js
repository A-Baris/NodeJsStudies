
//express modules
const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const csurf=require("csurf");


//node modules
const path = require("path");

//routes
const routesOfUser = require("./routes/user");
const routesOfAdmin = require("./routes/admin");
const routesOfAuth = require("./routes/auth");

//custom
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data"); 
const locals = require("./middlewares/local")
const auth = require("./middlewares/auth")

//template engine
app.set("view engine", "ejs");


//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:"MyWeb",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60*60*24
    },
    store: new SequelizeStore({
        db:sequelize
    })
}));
app.use(locals);
app.use(csurf());




app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", routesOfAdmin);
app.use("/account",routesOfAuth);
app.use(routesOfUser);





const Category = require("./models/category");
const Product = require("./models/product");
const User = require("./models/user");
const { Sequelize } = require("sequelize");
const local = require("./middlewares/local");


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