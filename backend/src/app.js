// The Express application, without listening, static file serving or any
// start-up disk access, so the same module runs locally (see index.js) and as
// a single Vercel function (see /api/index.js).
const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

const db = require('./db');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const collectionRoutes = require('./routes/collections');
const submissionRoutes = require('./routes/submissions');
const uploadRoutes = require('./routes/upload');

const app = express();
const onVercel = !!process.env.VERCEL;

// Behind Vercel's proxy the client IP arrives in X-Forwarded-For.
app.set('trust proxy', onVercel ? 1 : false);

if (process.env.CLIENT_ORIGIN) {
  app.use(cors({ origin: process.env.CLIENT_ORIGIN.split(',').map((s) => s.trim()) }));
}
app.use(express.json({ limit: '2mb' }));

// Loads the content document for this request. Serverless instances handle
// requests concurrently, so each request works on its own copy (req.db) and
// saves it back explicitly with db.save(req.db).
async function withDb(req, res, next) {
  try {
    req.db = await db.load();
    next();
  } catch (err) {
    next(err);
  }
}

const limiterDefaults = {
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false },
};
const loginLimiter = rateLimit({
  ...limiterDefaults,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Too many login attempts. Please wait 15 minutes and try again.' },
});
const submitLimiter = rateLimit({
  ...limiterDefaults,
  windowMs: 60 * 60 * 1000,
  limit: 20,
  message: { message: 'Too many submissions from this network. Please try again later.' },
});

app.get('/api/health', (req, res) =>
  res.json({
    ok: true,
    storage: db.mode(),
    // Names (never values) of the storage variables the function can see; helps diagnose setup.
    storageVars: Object.keys(process.env).filter((k) => /BLOB|UPSTASH|KV_REST|OIDC/.test(k)).sort(),
    time: new Date().toISOString(),
  })
);
app.post('/api/auth/login', loginLimiter);
app.post('/api/submissions/:type', submitLimiter);
app.use(['/api/auth', '/api/content', '/api/collections', '/api/submissions'], withDb);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/upload', uploadRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || err.statusCode || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
