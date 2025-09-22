import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Auth/Login";
import CompanyRegister from "./pages/Auth/companyRegister";
import CompanyWizard from "./pages/company/CompanyWizard";
import SettingsPage from "./pages/Settings/SettingsPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { CompanyProvider } from "./context/CompanyContext";
import store from "./app/store";
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <CompanyProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/company/wizard" element={<CompanyWizard />} />
            <Route path="/company-user/register" element={<CompanyRegister />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </CompanyProvider>
    </Provider>
  );
}

export default App;
