const express = require("express");
const router = express.Router();
const adminController=require("../controllers/admin");
const imageUpload = require("../helpers/image-upload-helper");
const isAuth = require("../middlewares/auth");
const csrf = require("../middlewares/csrf");

router.get("/product/delete/:id",isAuth,csrf,adminController.get_product_delete);
router.post("/product/delete/:id",isAuth,adminController.post_product_delete);
router.get("/product/edit/:id",isAuth,csrf,adminController.get_product_edit);
router.post("/product/edit/:id",isAuth,imageUpload.upload.single("image"),adminController.post_product_edit);

router.get("/product/create",csrf,isAuth,csrf,adminController.get_product_create);
router.post("/product/create",isAuth,imageUpload.upload.single("image"),adminController.post_product_create);
router.use("/",isAuth,adminController.index);


module.exports = router;