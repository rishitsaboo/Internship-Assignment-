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

    // Normalize mobile number to E.164-ish format if possible (keep leading + and digits)
    if (typeof mobile_no === "string") {
        mobile_no = mobile_no.replace(/[^+\d]/g, "");
    }

    // Normalize gender to uppercase to match DB constraint
    if (gender) {
        gender = gender.toUpperCase();
    }

    try {
    // check if user already exists by email or mobile
    const existingByEmail = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingByEmail.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    if (mobile_no) {
        const existingByMobile = await pool.query("SELECT id FROM users WHERE mobile_no = $1", [mobile_no]);
        if (existingByMobile.rows.length > 0) {
            return res.status(409).json({ message: "Mobile number already registered" });
        }
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
        // Handle Postgres unique constraint violation gracefully
        if (error && error.code === '23505') {
            if (String(error.constraint || '').includes('unique_mobile_no')) {
                return res.status(409).json({ message: "Mobile number already registered" });
            }
            if (String(error.constraint || '').includes('unique_email')) {
                return res.status(409).json({ message: "Email already registered" });
            }
            return res.status(409).json({ message: "Duplicate value" });
        }

        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser };

// Login controller
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userResult = await pool.query(
            "SELECT id, email, password, full_name FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server misconfiguration: missing JWT secret" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports.loginUser = loginUser;