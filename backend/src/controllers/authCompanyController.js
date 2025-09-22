const { pool } = require("../config/db");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAsCompany = async (req, res) => {
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
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                signup_type: user.signup_type
            }
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Server error" });
    }

};

const registerAsCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ownerId = req.user.id; // from JWT

  const {
    company_logo_url,
    company_banner_url,
    company_name,
    about_company,
    organizations_type,   
    industry_type,
    team_size,
    year_of_establishment,
    company_website,
    company_app_link,
    company_vision,
    headquarter_phone_no,
    social_links,
    map_location_url,
    careers_link,
    headquarter_mail_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO company_profile
      (owner_id, company_logo_url, company_banner_url, company_name, about_company, organizations_type,
       industry_type, team_size, year_of_establishment, company_website, company_app_link, company_vision,
       headquarter_phone_no, social_links, map_location_url, careers_link, headquarter_mail_id,
       created_at, updated_at, is_claimed)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,NOW(),NOW(),false)
      RETURNING id, company_name, owner_id`,
      [
        ownerId,
        company_logo_url,
        company_banner_url,
        company_name,
        about_company,
        organizations_type,
        industry_type,
        team_size,
        year_of_establishment,
        company_website,
        company_app_link,
        company_vision,
        headquarter_phone_no,
        social_links,
        map_location_url,
        careers_link,
        headquarter_mail_id
      ]
    );

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: result.rows[0]
    });
  } catch (err) {
    console.error("Error registering company:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerAsCompany, loginAsCompany };
