const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Expected format: "Bearer <token>"
    const bearer = token.split(' ')[1] || token;
    
    // Fallback secret if not present in env
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET || 'fallback_secret_for_dev_only');
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
}

module.exports = auth;
