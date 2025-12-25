require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Database config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'auth_dashboard_db',
};

let db;

// Connect DB
(async function connectDB() {
  try {
    db = await mysql.createPool(dbConfig);
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

// ---------------- AUTH ROUTES ----------------

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name || 'User', email, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------- AUTH MIDDLEWARE ----------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ---------------- USERS ROUTE ----------------
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
    );

    // Format the users data
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name || 'User',
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      isReal: true
    }));

    res.json({ success: true, users: formattedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ---------------- DASHBOARD DATA ----------------
// ---------------- DASHBOARD DATA (REAL + DEMO) ----------------
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    // ---------- SUMMARY ----------
    const [[{ totalUsers }]] = await db.execute(
      'SELECT COUNT(*) AS totalUsers FROM users'
    );

    const [[{ activeSessions }]] = await db.execute(
      'SELECT COUNT(*) AS activeSessions FROM sessions WHERE is_active = 1'
    );

    const [[{ revenue }]] = await db.execute(
      'SELECT IFNULL(SUM(amount),0) AS revenue FROM payments'
    );

    // ---------- USER GROWTH ----------
    const [userGrowthRows] = await db.execute(`
      SELECT MONTH(created_at) AS month, COUNT(*) AS count
      FROM users
      GROUP BY MONTH(created_at)
      ORDER BY MONTH(created_at)
      LIMIT 6
    `);

    // ---------- TRAFFIC SOURCES ----------
    const [trafficRows] = await db.execute(`
      SELECT source, COUNT(*) AS count
      FROM payments
      GROUP BY source
    `);

    const hasRealData =
      totalUsers > 0 || activeSessions > 0 || revenue > 0;

    // ---------- DEMO FALLBACK ----------
    if (!hasRealData) {
      return res.json({
        summary: {
          totalUsers: 12402,
          activeSessions: 842,
          revenue: 48200,
          userGrowth: 12.5,
          sessionGrowth: -2.4,
          revenueGrowth: 8.2,
        },
        chartData: {
          users: [12, 19, 3, 5, 2, 3],
          revenue: [1200, 1900, 300, 500, 200, 300],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          traffic: {
            Direct: 300,
            Social: 50,
            Referral: 100,
          },
        },
      });
    }

    // ---------- REAL DATA ----------
    const labels = userGrowthRows.map(r =>
      new Date(2024, r.month - 1).toLocaleString('default', { month: 'short' })
    );

    const usersData = userGrowthRows.map(r => r.count);

    const traffic = { Direct: 0, Social: 0, Referral: 0 };
    trafficRows.forEach(r => (traffic[r.source] = r.count));

    res.json({
      summary: {
        totalUsers,
        activeSessions,
        revenue,
        userGrowth: 10.1,
        sessionGrowth: 4.3,
        revenueGrowth: 6.8,
      },
      chartData: {
        users: usersData,
        revenue: usersData.map(u => u * 50),
        labels,
        traffic,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Stats error' });
  }
});


app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
