const jwt = require('jsonwebtoken');

function secret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.VERCEL) throw new Error('JWT_SECRET environment variable is required in production');
  return 'dev-secret-change-me';
}

function signToken(user) {
  return jwt.sign({ sub: user.id, username: user.username }, secret(), { expiresIn: '7d' });
}

/** Returns the token payload or throws. */
function verifyToken(token) {
  if (!token) throw new Error('Authentication required');
  return jwt.verify(token, secret());
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired session. Please log in again.' });
  }
}

module.exports = { signToken, verifyToken, requireAuth };
