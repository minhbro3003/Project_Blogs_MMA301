const express = require("express");
const {
    registerController,
    loginController,
    updateUserController,
} = require("../controllers/userController");
//riouter obj
const router = express.Router();

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//update
router.put("/update-user", updateUserController);

//export
module.exports = router;
