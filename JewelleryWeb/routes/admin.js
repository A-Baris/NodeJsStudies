const express = require("express");
const router = express.Router();
const adminController=require("../controllers/admin");
const imageUpload = require("../helpers/image-upload-helper");
router.get("/product/edit/:id",adminController.get_product_edit);
router.post("/product/edit/:id",imageUpload.upload.single("image"),adminController.post_product_edit);

router.get("/product/create",adminController.get_product_create);
router.post("/product/create",imageUpload.upload.single("image"),adminController.post_product_create);
router.use("/",adminController.index);


module.exports = router;