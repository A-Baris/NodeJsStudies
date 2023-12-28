const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const products = require("./routes/products");


app.use(express.json());
app.use(cors({
origin:"*",
methods:["GET","POST"]
}));
// app.use((req,res,next)=>{
// res.setHeader("Access-Control-Allow-Origin","*");
// res.setHeader("Access-control-Allow-Methods","GET");
// next();
// })

app.use("/api/products" ,products);




const mongooseConnection = mongoose.connect("mongodb+srv://barisemirdag:342093ABE@cluster0.85szbxc.mongodb.net/shoppingdb?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Bağlantı Gerçekleşti"))
.catch((err)=>{console.log(err)});

app.listen(3000,()=>{
    console.log("port 3000");
});