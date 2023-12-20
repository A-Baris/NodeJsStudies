const express = require("express");
const router = express.Router();
const userController=require("../controllers/user");

router.use("/products/category/:categoryid", userController.productCategory);
router.use("/products/:productid",userController.products_details);
router.use("/",userController.index);

module.exports = router;