const bcrypt = require("bcrypt");
const { pool } = require("../config/db.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { email, password, full_name, gender, mobile_no, signup_type } = req.body;

    // Normalize gender to uppercase to match DB constraint
    if (gender) {
        gender = gender.toUpperCase();
    }

    try {
    // check if user already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "Insert into users(email,password,full_name,gender,mobile_no,signup_type,is_mail_verified,is_mo_verified,created_at,updated_at) values($1,$2,$3,$4,$5,$6,false,false,NOW(),NOW()) RETURNING id, email, full_name",
        [email, hashedpassword, full_name, gender, mobile_no, signup_type]
    );

    res.status(201).json({
    success : true,
    message : "User registered successfully. Please verify email & mobile",
    user : result.rows[0]
    });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userRes = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(!userRes.rows.length){
            return res.status(401).json({message : "Invalid email or password"});
        }
        const user = userRes.rows[0];
        // compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // generate JWT
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET ||  "your_jwt_secret",
            {expiresIn: "10d"}
        );
        res.json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Server error" });
    }

};

module.exports = { registerUser, loginUser };