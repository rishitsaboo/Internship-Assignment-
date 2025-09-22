const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/auth_Login_Register_User.js");

const router = express.Router();

router.post(
    "/register",
    body("email").isEmail(),
    body("full_name").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("gender").isIn(["M","F","O"]),
    body("mobile_no").isMobilePhone(),
    body("signup_type").equals("e"),
    registerUser
);

// Login route
router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    loginUser
);

module.exports = router;
