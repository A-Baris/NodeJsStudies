const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const path = require("path");
const routesOfUser = require("./routes/user");
const routesOfAdmin = require("./routes/admin");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", routesOfAdmin);
app.use(routesOfUser); 

app.listen(4000, function() {
    console.log("listening on port 4000");
});