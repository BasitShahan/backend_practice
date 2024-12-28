const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user.controller");
const auth=require("../middleware/auth")

router.post("/reg", usercontroller.signup);
router.get("/getall", usercontroller.getalluser);
router.get("/delete/:id",auth, usercontroller.deleteuser);

router.get("/update/:id", usercontroller.updateUser);
router.post("/login", usercontroller.loginUser);


module.exports = router;
