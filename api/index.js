// Vercel serverless entry point. vercel.json rewrites every /api/* request here;
// Express receives the original URL, so the normal routers in backend/src apply.
module.exports = require('../backend/src/app');
