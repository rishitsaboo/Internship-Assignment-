const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware.js");
const { registerAsCompany, loginAsCompany } = require("../controllers/authCompanyController.js");
const { getCompanyProfile, updateCompanyProfile } = require("../controllers/companyController.js");

const router = express.Router();

router.post(
    "/login",
    body("email").isEmail(),
    body("password").notEmpty(),
    loginAsCompany
);

router.post(
    "/register",
    authMiddleware,  // Ensure only authenticated users can register a company
    body("company_logo_url").isURL(),
    body("company_banner_url").isURL(),
    body("company_name").notEmpty(),
    body("about_company").isString(),
    body("organizations_type").notEmpty(),
    body("industry_type").notEmpty(),
    body("team_size").isInt({ min: 1 }),
    body("year_of_establishment").isISO8601().toDate(),
    body("company_website").isURL(),
    body("company_app_link").optional().isURL(),
    body("company_vision").notEmpty(),
    body("headquarter_phone_no").isMobilePhone(),
    body("social_links").isObject(),
    body("map_location_url").isURL(),
    body("careers_link").isURL(),
    body("headquarter_mail_id").isEmail(),
    registerAsCompany
);

// Get company profile
router.get("/profile", authMiddleware, getCompanyProfile);

// Update company profile
router.put("/profile", authMiddleware, updateCompanyProfile);

module.exports = router;
