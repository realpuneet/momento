const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controller");
const authUser = require("../middlewares/auth.middleware");
const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authUser, logoutController);


module.exports = router;
