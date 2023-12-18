const express = require("express");
const router = express.Router();


router.use("/admin",function(req,res){

    res.render("users/index",{
        title:"Unique Accessories"

    })
    console.log("calisti");
})

module.exports = router;