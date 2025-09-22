import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../context/CompanyContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function CompanyWizard() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { updateCompanyData } = useCompany();

  // State to hold all form data
  const [formData, setFormData] = useState({
    company_name: "",
    about_company: "",
    organizations_type: "",
    industry_type: "",
    team_size: "",
    year_of_establishment: "",
    headquarter_mail_id: "",
    headquarter_phone_no: "",
    map_location_url: "",
    company_website: "",
    company_app_link: "",
    company_vision: "",
    social_links: [],
    careers_link: "",
    company_logo_url: null,
    company_banner_url: null,
    is_claimed: false,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: "", url: "" }],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  };

  const handleSocialChange = (index, field, value) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, social_links: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("All Data Ready to Submit:", formData);
    try {
      // Use the company context to save data
      await updateCompanyData(formData);
      
      toast.success("Company profile created successfully!");
      
      // Navigate to dashboard after successful creation
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Failed to create company profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Profile Setup</h1>
          <p className="text-gray-600">Complete your company profile in 4 simple steps</p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Basic Info", icon: "🏢" },
              { step: 2, title: "Details", icon: "📋" },
              { step: 3, title: "Social Media", icon: "📱" },
              { step: 4, title: "Contact", icon: "📞" }
            ].map((s, index) => (
              <div key={s.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                      step >= s.step
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s.step ? "✓" : s.icon}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step >= s.step ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {s.title}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      step > s.step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Step Content */}
        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">🏢 Company Information</h2>
                <p className="text-gray-600">Let's start with the basics about your company</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Company Logo</label>
                  <label className="group cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group-hover:scale-105">
                      <div className="text-4xl mb-3">📸</div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Upload Logo</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      name="company_logo_url"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Banner Image</label>
                  <label className="group cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group-hover:scale-105">
                      <div className="text-4xl mb-3">🖼️</div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Upload Banner</p>
                      <p className="text-xs text-gray-500">1520x400px recommended</p>
                    </div>
                    <input
                      type="file"
                      name="company_banner_url"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">About Company *</label>
                  <textarea
                    name="about_company"
                    value={formData.about_company}
                    onChange={handleChange}
                    placeholder="Tell us about your company, its mission, and what makes it unique..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">📋 Company Details</h2>
                <p className="text-gray-600">Tell us more about your company's background</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization Type *
                    </label>
                    <select
                      name="organizations_type"
                      value={formData.organizations_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select type...</option>
                      <option value="Private">🏢 Private</option>
                      <option value="Public">🏛️ Public</option>
                      <option value="NGO">🤝 NGO</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Industry Type *
                    </label>
                    <input
                      name="industry_type"
                      value={formData.industry_type}
                      onChange={handleChange}
                      placeholder="e.g. Technology, Healthcare"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Size *
                    </label>
                    <select
                      name="team_size"
                      value={formData.team_size}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select size...</option>
                      <option value="1-10">👥 1-10 employees</option>
                      <option value="11-50">👥👥 11-50 employees</option>
                      <option value="51-200">👥👥👥 51-200 employees</option>
                      <option value="200+">👥👥👥👥 200+ employees</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year of Establishment *
                    </label>
                    <input
                      type="date"
                      name="year_of_establishment"
                      value={formData.year_of_establishment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="company_website"
                      value={formData.company_website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Vision *
                  </label>
                  <textarea
                    name="company_vision"
                    value={formData.company_vision}
                    onChange={handleChange}
                    placeholder="Share your company's vision and goals..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">📱 Social Media Profiles</h2>
                <p className="text-gray-600">Connect your social media presence</p>
              </div>
              
              <div className="space-y-4">
                {formData.social_links.map((link, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-32">
                        <select
                          value={link.platform}
                          onChange={(e) =>
                            handleSocialChange(index, "platform", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select Platform</option>
                          <option value="facebook">📘 Facebook</option>
                          <option value="twitter">🐦 Twitter</option>
                          <option value="instagram">📷 Instagram</option>
                          <option value="youtube">📺 YouTube</option>
                          <option value="linkedin">💼 LinkedIn</option>
                        </select>
                      </div>
                      
                      <div className="flex-1">
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            handleSocialChange(index, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Remove this social link"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">Add Social Media Link</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">📞 Contact Information</h2>
                <p className="text-gray-600">How can people reach your company?</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <div className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-gray-600 text-sm font-medium">
                      🇧🇩 +880
                    </div>
                    <input
                      type="tel"
                      name="headquarter_phone_no"
                      value={formData.headquarter_phone_no}
                      onChange={handleChange}
                      placeholder="1XXXXXXXXX"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="flex">
                    <div className="inline-flex items-center px-4 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-gray-600 text-sm font-medium">
                      📧
                    </div>
                    <input
                      type="email"
                      name="headquarter_mail_id"
                      value={formData.headquarter_mail_id}
                      onChange={handleChange}
                      placeholder="contact@company.com"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company App Link
                  </label>
                  <input
                    type="url"
                    name="company_app_link"
                    value={formData.company_app_link}
                    onChange={handleChange}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Careers Page
                  </label>
                  <input
                    type="url"
                    name="careers_link"
                    value={formData.careers_link}
                    onChange={handleChange}
                    placeholder="https://company.com/careers"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
              )}
              
              <div className="flex-1"></div>
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Next Step</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete Setup</span>
                </button>
              )}
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
