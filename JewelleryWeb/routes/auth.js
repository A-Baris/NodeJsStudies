const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/logout",authController.get_logout);
router.get("/login",authController.get_login);
router.post("/login",authController.post_login);
router.get("/register",authController.get_register);
router.post("/register",authController.post_register);

module.exports = router;