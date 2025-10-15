const express = require("express");
const authUser = require("../middlewares/auth.middleware");
const { getCurrentUser } = require("../controllers/user.controller");
const router = express.Router();


router.get("/me",authUser, getCurrentUser);


module.exports = router;
