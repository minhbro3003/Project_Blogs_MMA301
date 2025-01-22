const express = require("express");
const {
    registerController,
    loginController,
} = require("../controllers/userController");
//riouter obj
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);

//export
module.exports = router;
