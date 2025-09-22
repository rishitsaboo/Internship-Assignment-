# Frontend - React Application

A modern React frontend application built with Vite, Material-UI, and Tailwind CSS for the full-stack application.

## 🚀 Features

- **Modern UI**: Built with Material-UI components and Tailwind CSS
- **Responsive Design**: Mobile-first approach with react-responsive
- **State Management**: Redux Toolkit for global state management
- **Authentication**: Firebase integration for secure authentication
- **File Uploads**: Cloudinary integration for image uploads
- **Charts & Data Visualization**: Recharts for dashboard analytics
- **Form Handling**: React Hook Form with validation
- **Notifications**: Toast notifications with react-toastify
- **Routing**: React Router DOM for navigation

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Firebase** - Authentication
- **Cloudinary** - File uploads
- **Recharts** - Data visualization
- **React Hook Form** - Form handling
- **React Toastify** - Notifications

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration
│   │   ├── axios.js       # Axios setup
│   │   └── firebase.js    # Firebase setup
│   ├── app/               # Redux store configuration
│   ├── components/        # Reusable components
│   │   ├── Layout/        # Layout components
│   │   └── OtpModel.jsx   # OTP modal component
│   ├── context/           # React context providers
│   ├── features/          # Redux slices
│   │   ├── auth/          # Authentication slice
│   │   └── company/       # Company slice
│   ├── pages/             # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── company/       # Company management pages
│   │   ├── Dashboard/     # Dashboard pages
│   │   └── Settings/      # Settings pages
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. The configuration includes:
- Custom color palette
- Material-UI integration
- Responsive breakpoints

### Redux Store

The Redux store is configured in `src/app/store.js` with slices for:
- Authentication (`authSlice.js`)
- Company data (`companySlice.js`)

## 📱 Key Components

### Authentication Pages
- **Login.jsx** - User login page
- **companyRegister.jsx** - Company registration

### Dashboard
- **Dashboard.jsx** - Main dashboard with analytics
- **CompanyWizard.jsx** - Company setup wizard

### Layout
- **DashboardLayout.jsx** - Main layout wrapper

## 🎨 Styling

The application uses a combination of:
- **Material-UI**: For complex components and theming
- **Tailwind CSS**: For utility-first styling and layout
- **Custom CSS**: For specific component styling

## 🔌 API Integration

The frontend communicates with the backend API through:
- **Axios**: Configured in `src/api/axios.js`
- **React Query**: For server state management
- **Redux**: For client state management

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for new components when possible
3. Ensure responsive design for all new components
4. Test on multiple screen sizes
5. Follow the established folder structure

## 📝 Notes

- The application uses modern React patterns with hooks
- State management follows Redux best practices
- Components are designed to be reusable and modular
- The UI follows Material Design principles with custom theming
