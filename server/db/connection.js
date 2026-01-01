const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

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

// Get database instance
function getDB() {
  return db;
}

module.exports = getDB;

