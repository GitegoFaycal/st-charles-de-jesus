// Local / self-hosted entry point: serves the API from app.js plus the
// uploaded media folder and, when built, the React app from frontend/dist.
// On Vercel this file is not used (see /api/index.js and vercel.json).
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const fs = require('fs');

const api = require('./app');
const db = require('./db');

const server = express();
const PORT = process.env.PORT || 5000;
const PUBLIC_UPLOADS = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads');
const FRONTEND_DIST = path.join(__dirname, '..', '..', 'frontend', 'dist');

server.use('/uploads', express.static(PUBLIC_UPLOADS, { maxAge: '7d' }));

if (fs.existsSync(FRONTEND_DIST)) {
  server.use(express.static(FRONTEND_DIST));
  // SPA fallback for page routes; API and media requests fall through to the app.
  server.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

server.use(api);

server.listen(PORT, () => {
  console.log(`Saint Charles de Jesus TSS API running on http://localhost:${PORT} (storage: ${db.mode()})`);
});
