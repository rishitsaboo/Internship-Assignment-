const { pool } = require("../config/db");
const { validationResult } = require("express-validator");

// Get company profile
const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await pool.query(
      `SELECT * FROM company_profile WHERE owner_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: "Company profile not found",
        companyData: null 
      });
    }

    const companyData = result.rows[0];
    
    // Parse social_links if it's a string
    if (companyData.social_links && typeof companyData.social_links === 'string') {
      try {
        companyData.social_links = JSON.parse(companyData.social_links);
      } catch (e) {
        companyData.social_links = [];
      }
    }

    res.json({
      success: true,
      message: "Company profile retrieved successfully",
      ...companyData
    });
  } catch (err) {
    console.error("Error getting company profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update company profile
const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const {
      company_name,
      about_company,
      organizations_type,
      industry_type,
      team_size,
      year_of_establishment,
      headquarter_mail_id,
      headquarter_phone_no,
      map_location_url,
      company_website,
      company_app_link,
      company_vision,
      social_links,
      careers_link,
      company_logo_url,
      company_banner_url,
      is_claimed
    } = req.body;

    // Check if company profile exists
    const existingProfile = await pool.query(
      `SELECT id FROM company_profile WHERE owner_id = $1`,
      [userId]
    );

    let result;
    
    if (existingProfile.rows.length === 0) {
      // Create new company profile
      result = await pool.query(
        `INSERT INTO company_profile
        (owner_id, company_name, about_company, organizations_type, industry_type, team_size,
         year_of_establishment, headquarter_mail_id, headquarter_phone_no, map_location_url,
         company_website, company_app_link, company_vision, social_links, careers_link,
         company_logo_url, company_banner_url, is_claimed, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), NOW())
        RETURNING *`,
        [
          userId,
          company_name,
          about_company,
          organizations_type,
          industry_type,
          team_size,
          year_of_establishment,
          headquarter_mail_id,
          headquarter_phone_no,
          map_location_url,
          company_website,
          company_app_link,
          company_vision,
          social_links,
          careers_link,
          company_logo_url,
          company_banner_url,
          is_claimed || false
        ]
      );
    } else {
      // Update existing company profile
      result = await pool.query(
        `UPDATE company_profile SET
         company_name = COALESCE($2, company_name),
         about_company = COALESCE($3, about_company),
         organizations_type = COALESCE($4, organizations_type),
         industry_type = COALESCE($5, industry_type),
         team_size = COALESCE($6, team_size),
         year_of_establishment = COALESCE($7, year_of_establishment),
         headquarter_mail_id = COALESCE($8, headquarter_mail_id),
         headquarter_phone_no = COALESCE($9, headquarter_phone_no),
         map_location_url = COALESCE($10, map_location_url),
         company_website = COALESCE($11, company_website),
         company_app_link = COALESCE($12, company_app_link),
         company_vision = COALESCE($13, company_vision),
         social_links = COALESCE($14, social_links),
         careers_link = COALESCE($15, careers_link),
         company_logo_url = COALESCE($16, company_logo_url),
         company_banner_url = COALESCE($17, company_banner_url),
         is_claimed = COALESCE($18, is_claimed),
         updated_at = NOW()
         WHERE owner_id = $1
         RETURNING *`,
        [
          userId,
          company_name,
          about_company,
          organizations_type,
          industry_type,
          team_size,
          year_of_establishment,
          headquarter_mail_id,
          headquarter_phone_no,
          map_location_url,
          company_website,
          company_app_link,
          company_vision,
          social_links,
          careers_link,
          company_logo_url,
          company_banner_url,
          is_claimed
        ]
      );
    }

    const companyData = result.rows[0];
    
    // Parse social_links if it's a string
    if (companyData.social_links && typeof companyData.social_links === 'string') {
      try {
        companyData.social_links = JSON.parse(companyData.social_links);
      } catch (e) {
        companyData.social_links = [];
      }
    }

    res.json({
      success: true,
      message: "Company profile updated successfully",
      ...companyData
    });
  } catch (err) {
    console.error("Error updating company profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCompanyProfile, updateCompanyProfile };
