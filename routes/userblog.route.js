

const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/userblog.controller");


router.post(
  "/createblog",

  usercontroller.createUserBlog
);

module.exports = router;
