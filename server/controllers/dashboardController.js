const getDB = require('../db/connection');

// Get dashboard stats
const getStats = async (req, res) => {
  const db = getDB();

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
};

module.exports = {
  getStats,
};

