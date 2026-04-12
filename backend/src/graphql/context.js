// src/graphql/context.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = ({ req }) => {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    const token = auth.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { user: decoded };
    } catch {
      return { user: null };
    }
  }
  return { user: null };
};