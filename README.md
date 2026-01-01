# Full-Stack Authentication System with Admin Dashboard

A modern, full-stack web application featuring secure user authentication and a comprehensive admin dashboard with data visualization.

## 🚀 Features

### Authentication
- ✅ User Registration with email validation
- ✅ Secure Login with JWT tokens
- ✅ Password hashing using bcrypt
- ✅ Protected routes with authentication middleware
- ✅ Session management

### Admin Dashboard
- ✅ **Overview Dashboard** with key metrics
  - Total Users statistics
  - Active Sessions tracking
  - Revenue analytics
  - Growth indicators with percentage changes
- ✅ **Data Visualization**
  - Interactive line charts (User Growth)
  - Doughnut charts (Traffic Sources)
  - Real-time data updates
- ✅ **Users Management**
  - View all registered users
  - Display real users from database
  - Demo users for demonstration
  - User details with join dates
- ✅ **Settings Page**
  - Dark mode toggle
  - Notification preferences
  - Appearance settings
  - Auto-refresh options

### UI/UX Features
- ✅ **Modern Design**
  - Beautiful gradient card designs
  - Color-coded statistics (Blue, Purple, Emerald)
  - Responsive layout
  - Smooth animations and transitions
- ✅ **Dark Mode Support**
  - System preference detection
  - Persistent theme selection
  - Smooth theme transitions
- ✅ **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layouts
  - Touch-friendly interactions

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Styling framework
- **Chart.js 4.4.1** - Data visualization
- **Lucide React** - Icon library
- **React Hooks** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.3** - Web framework
- **MySQL** - Database
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 2.4.3** - Password hashing
- **mysql2 3.9.2** - MySQL driver

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd full-stack-auth
```

### 2. Database Setup

1. Start your MySQL server
2. Create the database and tables:

```bash
mysql -u root -p < server/schema.sql
```

Or manually run the SQL commands from `server/schema.sql`:
```sql
CREATE DATABASE IF NOT EXISTS auth_dashboard_db;
USE auth_dashboard_db;
-- ... (rest of schema.sql)
```

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=auth_dashboard_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 4. Frontend Setup

```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
# or
npm start
```

The server will run on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

### Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

## 📁 Project Structure

```
full-stack-auth/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardView.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── contexts/       # React contexts
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/         # Custom hooks
│   │   │   └── useChartJs.js
│   │   ├── utils/         # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js application
│   ├── server.js          # Main server file
│   ├── schema.sql         # Database schema
│   ├── package.json
│   └── .env              # Environment variables (create this)
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

- **POST** `/api/register`
  - Register a new user
  - Body: `{ name, email, password }`
  - Returns: `{ success, message }`

- **POST** `/api/login`
  - Login user
  - Body: `{ email, password }`
  - Returns: `{ success, token, user }`

### Dashboard

- **GET** `/api/stats` (Protected)
  - Get dashboard statistics
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ summary, chartData }`

- **GET** `/api/users` (Protected)
  - Get all users
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success, users }`

## 🎨 Features Overview

### Dashboard Cards
- **Total Users Card** (Blue theme)
  - Displays total registered users
  - Shows user growth percentage
  - Beautiful gradient background

- **Active Sessions Card** (Purple theme)
  - Tracks active user sessions
  - Session growth metrics
  - Elegant purple gradient

- **Total Revenue Card** (Emerald theme)
  - Revenue statistics
  - Revenue growth tracking
  - Professional emerald gradient

### Charts
- **User Growth Chart** - Line chart showing user growth over 6 months
- **Traffic Sources Chart** - Doughnut chart displaying traffic distribution

### User Management
- View all registered users
- Real-time user data from database
- Demo users for testing
- User status indicators

### Settings
- Dark mode toggle with persistence
- Notification preferences
- Appearance customization
- Auto-refresh settings

## 🔐 Default Credentials

For testing purposes, you can use:
- **Email**: `admin@example.com`
- **Password**: `password`

Or register a new account through the registration page.

## 🌙 Dark Mode

The application supports dark mode with:
- System preference detection
- Manual toggle in Settings
- Persistent theme storage
- Smooth transitions

## 📝 Environment Variables

### Server (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_dashboard_db
JWT_SECRET=your_secret_key
```

## 🏗️ Build for Production

### Build Frontend

```bash
cd client
npm run build
```

The build output will be in `client/dist/`

### Run Production Server

```bash
cd server
npm start
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify database credentials in `.env`
- Check if database exists: `SHOW DATABASES;`

### Port Already in Use
- Change the PORT in server `.env` file
- Update API baseUrl in `client/src/utils/api.js`

### CORS Issues
- Ensure backend CORS is properly configured
- Check that frontend and backend URLs match

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Adding New Features
1. Create components in `client/src/components/`
2. Add API routes in `server/server.js`
3. Update database schema if needed
4. Test thoroughly

### Code Structure
- Components are modular and reusable
- API utilities centralized in `utils/api.js`
- Theme management via Context API
- Custom hooks for reusable logic

## 🎯 Future Enhancements

- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Role-based access control
- [ ] Export data functionality
- [ ] Advanced analytics
- [ ] Real-time notifications

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MySQL**

