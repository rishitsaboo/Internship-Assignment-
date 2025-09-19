const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController.js");

const router = express.Router();

router.post(
    "/register",
    body("email").isEmail(),
    body("full_name").notEmpty(),
    body("username").notEmpty(),
    body("dob").isISO8601().toDate(),
    body("password").isLength({ min: 6 }),
    body("gender").isIn(["M","F","O"]),
    body("mobile_no").isMobilePhone(),
    body("signup_type").equals("e"),
    registerUser
);

router.post(
    "/login",
    body("email").isEmail(),
    body("password").notEmpty(),
    loginUser
);

module.exports = router;
