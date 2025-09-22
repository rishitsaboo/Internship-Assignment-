# Full-Stack Application

A modern full-stack web application with user authentication, company management, and dashboard functionality.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Company Management**: Company registration and profile management
- **Dashboard**: Interactive dashboard with data visualization
- **Favorites System**: Save and manage favorite items
- **Responsive Design**: Mobile-friendly UI built with Material-UI and Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Forms**: React Hook Form

### Additional Tools
- **File Upload**: Cloudinary
- **Authentication**: Firebase
- **Phone Input**: React Phone Input 2
- **Date Picker**: React Datepicker
- **Responsive**: React Responsive

## 📁 Project Structure

```
/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   └── README.md           # Backend setup guide
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Redux slices
│   │   ├── api/           # API configuration
│   │   └── App.jsx        # Main app component
│   └── README.md          # Frontend setup guide
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env .env.local
```
Update the `.env` file with your database credentials and other configuration.

4. Set up the database:
```bash
npm run setup
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`.

For detailed backend setup instructions, see [backend/README.md](backend/README.md).

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

For detailed frontend setup instructions, see [frontend/README.md](frontend/README.md).

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Company
- `POST /api/company/register` - Register company (requires auth)
- `POST /api/company/login` - Company login
- `GET /api/company/profile` - Get company profile (requires auth)

### Dashboard
- `GET /api/dashboard` - Get dashboard data (requires auth)

### Favorites
- `POST /api/favorites` - Add to favorites (requires auth)
- `DELETE /api/favorites/:recipeId` - Remove from favorites (requires auth)
- `GET /api/favorites` - Get user's favorites (requires auth)

## 🔧 Development

### Available Scripts

#### Backend
- `npm start` - Start production server
- `npm run setup` - Initialize database
- `npm run test-db` - Test database connection

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

#### Backend (.env)
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Note**: Make sure to check the individual README files in `backend/` and `frontend/` directories for detailed setup instructions specific to each part of the application.
