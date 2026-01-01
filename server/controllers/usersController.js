const getDB = require('../db/connection');

// Get all users
const getUsers = async (req, res) => {
  const db = getDB();

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
};

module.exports = {
  getUsers,
};

