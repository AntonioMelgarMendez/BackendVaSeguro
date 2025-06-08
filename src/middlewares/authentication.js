
const jwt = require('jsonwebtoken'); 

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  try {
    const user = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
module.exports = {
    authenticateToken,
    authorizeRoles,
  };