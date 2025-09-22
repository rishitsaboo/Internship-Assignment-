import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useCompany } from '../../context/CompanyContext';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const { companyData, loading, error, updateCompanyData, clearError } = useCompany();
  const [activeTab, setActiveTab] = useState('company-info');
  
  const tabs = [
    { id: 'company-info', label: 'Company Info', icon: '🏢' },
    { id: 'founding-info', label: 'Founding Info', icon: '📅' },
    { id: 'social-media', label: 'Social Media Profile', icon: '📱' },
    { id: 'account-setting', label: 'Account Setting', icon: '⚙️' }
  ];
  
  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  const nextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };
  
  const prevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };
  const [formData, setFormData] = useState({
    company_name: '',
    about_company: '',
    company_logo_url: null,
    company_banner_url: null,
    organizations_type: '',
    industry_type: '',
    team_size: '',
    year_of_establishment: '',
    headquarter_mail_id: '',
    headquarter_phone_no: '',
    company_website: '',
    company_vision: '',
    social_links: []
  });
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  // Load company data into form when context data changes
  useEffect(() => {
    if (companyData) {
      setFormData({
        company_name: companyData.company_name || '',
        about_company: companyData.about_company || '',
        organizations_type: companyData.organizations_type || '',
        industry_type: companyData.industry_type || '',
        team_size: companyData.team_size || '',
        year_of_establishment: companyData.year_of_establishment || '',
        headquarter_mail_id: companyData.headquarter_mail_id || '',
        headquarter_phone_no: companyData.headquarter_phone_no || '',
        company_website: companyData.company_website || '',
        company_vision: companyData.company_vision || '',
        social_links: companyData.social_links || []
      });
    }
  }, [companyData]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setFormData(prev => ({ ...prev, company_logo_url: file }));
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setFormData(prev => ({ ...prev, company_banner_url: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      social_links: [...prev.social_links, { platform: '', url: '' }],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  };

  const handleSocialChange = (index, field, value) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, social_links: updatedLinks });
  };

  const handleSaveChanges = async () => {
    try {
      clearError();
      console.log("All Data Ready to Submit:", formData);
      
      // Create FormData for POST request
      const postFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          postFormData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          postFormData.append(key, formData[key]);
        }
      });

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Use PUT endpoint for updating company profile
      const response = await api.put('/company/profile', postFormData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update local state with response data
      setFormData(prev => ({ ...prev, ...response.data }));
      
      toast.success('Company information updated successfully!');
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('Failed to update company information');
    }
  };

  if (loading && !companyData) {
    return (
      <DashboardLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading company data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-4 px-1 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'company-info' && (
          <div className="space-y-8">
            {/* Logo & Banner Image Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Logo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Upload Logo</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    {logoFile ? (
                      <img
                        src={URL.createObjectURL(logoFile)}
                        alt="Logo preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : companyData?.company_logo_url ? (
                      <img
                        src={companyData.company_logo_url}
                        alt="Current logo"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Logo Preview</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {logoFile ? `${(logoFile.size / 1024 / 1024).toFixed(1)} MB` : 'No file selected'}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    {logoFile && (
                      <button
                        onClick={() => setLogoFile(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Banner Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="w-full h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    {bannerFile ? (
                      <img
                        src={URL.createObjectURL(bannerFile)}
                        alt="Banner preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : companyData?.company_banner_url ? (
                      <img
                        src={companyData.company_banner_url}
                        alt="Current banner"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Banner Preview</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {bannerFile ? `${(bannerFile.size / 1024 / 1024).toFixed(1)} MB` : 'No file selected'}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="hidden"
                      />
                    </label>
                    {bannerFile && (
                      <button
                        onClick={() => setBannerFile(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>

            {/* About Us */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">About us</label>
              <textarea
                name="about_company"
                value={formData.about_company}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write down about your company here. Let the candidate know who we are..."
              />
              
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border">
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4a1 1 0 011-1h5.5a2.5 2.5 0 010 5H7v2h3.5a2.5 2.5 0 010 5H6a1 1 0 01-1-1V4zm2 1v2h3.5a.5.5 0 000-1H7zm0 4h3.5a.5.5 0 000-1H7v1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Italic">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9v2h2a1 1 0 110 2H9v2h2a1 1 0 110 2H9a1 1 0 01-1-1V3z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Underline">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Strikethrough">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Link">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bullet List">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Numbered List">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Founding Info Tab */}
        {activeTab === 'founding-info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                <select
                  name="organizations_type"
                  value={formData.organizations_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
                <input
                  name="industry_type"
                  value={formData.industry_type}
                  onChange={handleInputChange}
                  placeholder="e.g. IT, Healthcare"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <select
                  name="team_size"
                  value={formData.team_size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Establishment</label>
                <input
                  type="date"
                  name="year_of_establishment"
                  value={formData.year_of_establishment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                <input
                  type="url"
                  name="company_website"
                  value={formData.company_website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Vision</label>
              <textarea
                name="company_vision"
                value={formData.company_vision}
                onChange={handleInputChange}
                placeholder="Tell us about your company vision..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Social Media Profile Tab */}
        {activeTab === 'social-media' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Social Media Profiles
              </h2>
              
              {/* Social Links List */}
              <div className="space-y-4 mb-6">
                {formData.social_links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <select
                      value={link.platform}
                      onChange={(e) =>
                        handleSocialChange(index, "platform", e.target.value)
                      }
                      className="w-40 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select Platform</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        handleSocialChange(index, "url", e.target.value)
                      }
                      placeholder="Profile link/url..."
                      className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Remove this social link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Social Link Button */}
              <button
                type="button"
                onClick={addSocialLink}
                className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Social Link
              </button>

            </div>
          </div>
        )}

        {activeTab === 'account-setting' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Contact Information
              </h2>

              {/* Phone Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Phone
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 rounded-l-lg bg-gray-100 text-gray-600 text-sm">
                    +880
                  </span>
                  <input
                    type="tel"
                    name="headquarter_phone_no"
                    value={formData.headquarter_phone_no}
                    onChange={handleInputChange}
                    placeholder="Phone number..."
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 rounded-l-lg bg-gray-100 text-gray-600 text-sm">
                    📧
                  </span>
                  <input
                    type="email"
                    name="headquarter_mail_id"
                    value={formData.headquarter_mail_id}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentTabIndex > 0 && (
            <button
              type="button"
              onClick={prevTab}
              className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Previous
            </button>
          )}
          
          {currentTabIndex < tabs.length - 1 ? (
            <button
              type="button"
              onClick={nextTab}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
