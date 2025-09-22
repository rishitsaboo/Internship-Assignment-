import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

const CompanyContext = createContext();

const initialState = {
  companyData: {
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
  },
  loading: false,
  error: null,
  isLoaded: false
};

const companyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_COMPANY_DATA':
      return { 
        ...state, 
        companyData: { ...state.companyData, ...action.payload },
        loading: false,
        error: null,
        isLoaded: true
      };
    case 'UPDATE_COMPANY_DATA':
      return { 
        ...state, 
        companyData: { ...state.companyData, ...action.payload },
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Load company data on mount
  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = localStorage.getItem('token');
      
      if (!token) {
        // No token means user is not logged in, set default data
        dispatch({ type: 'SET_COMPANY_DATA', payload: initialState.companyData });
        return;
      }

      const response = await api.get('/company/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      dispatch({ type: 'SET_COMPANY_DATA', payload: response.data });
    } catch (error) {
      console.error('Error loading company data:', error);
      // If company doesn't exist yet, that's okay - user can create it
      if (error.response?.status === 404) {
        dispatch({ type: 'SET_COMPANY_DATA', payload: initialState.companyData });
      } else {
        dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to load company data' });
      }
    }
  };

  const updateCompanyData = async (data) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await api.put('/company/profile', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      dispatch({ type: 'UPDATE_COMPANY_DATA', payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Error updating company data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update company data' });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    loadCompanyData,
    updateCompanyData,
    clearError
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
