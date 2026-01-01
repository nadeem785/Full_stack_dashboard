require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_super_secret_key';

module.exports = SECRET_KEY;

