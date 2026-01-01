require('dotenv').config();
const express = require('express');

// Import configuration
const PORT = require('./config/server');

// Import database connection (this will initialize the connection)
require('./db/connection');

// Import middleware
const setupMiddleware = require('./middleware/index');

// Import routes
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Setup middleware
setupMiddleware(app);

// Routes
app.use('/api', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', dashboardRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
