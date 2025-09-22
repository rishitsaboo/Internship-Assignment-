import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarItems = [
    { name: 'Overview', icon: '📊', path: '/dashboard' },
    { name: 'Employers Profile', icon: '👤', path: '/profile' },
    { name: 'Post a Job', icon: '📝', path: '/post-job' },
    { name: 'My Jobs', icon: '💼', path: '/my-jobs' },
    { name: 'Saved Candidate', icon: '⭐', path: '/saved-candidates' },
    { name: 'Plans & Billing', icon: '💳', path: '/billing' },
    { name: 'All Companies', icon: '🏢', path: '/companies' },
    { name: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  const topNavItems = [
    { name: 'Home', path: '/home' },
    { name: 'Find Candidate', path: '/find-candidate' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Jobs', path: '/my-jobs' },
    { name: 'Applications', path: '/applications' },
    { name: 'Customer Supports', path: '/support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Page title */}
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">41_Settings_Personal</h1>
            </div>

            {/* Center - Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {topNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              {/* Phone number */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <span>+1-202-555-0178</span>
                <span className="text-lg">🇺🇸</span>
              </div>

              {/* Language selector */}
              <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600">
                <span>English</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Notification bell */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Post A Job button */}
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Post A Jobs
              </button>

              {/* Instagram icon */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-sm transition-all duration-300 min-h-screen`}>
          <div className="p-6">
            {/* Sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mb-6 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Sidebar title */}
            {isSidebarOpen && (
              <h2 className="text-lg font-semibold text-gray-900 mb-6">EMPLOYERS DASHBOARD</h2>
            )}

            {/* Sidebar navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                </Link>
              ))}
            </nav>

            {/* Logout button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/login"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {isSidebarOpen && <span className="font-medium">Log-out</span>}
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="px-6 text-center text-sm text-gray-500">
          © 2021 Jobpilot - Job Board. All rights Reserved
        </div>
      </footer>
    </div>
  );
}
