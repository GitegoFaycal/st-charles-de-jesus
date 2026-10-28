// Media uploads.
//  - Blob mode (Vercel): files go straight from the browser to Vercel Blob.
//    The API only issues a short-lived, admin-authenticated upload token.
//    Active when the Blob store is connected to the project (Vercel injects
//    BLOB_STORE_ID + an OIDC token, or a BLOB_READ_WRITE_TOKEN).
//  - Disk mode (local dev / self-hosting): multer writes to
//    frontend/public/uploads, which Vite and index.js serve at /uploads.
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { requireAuth, verifyToken } = require('../auth');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'uploads');
const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
  'video/mp4': '.mp4',
};
const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';

// Vercel names the variable BLOB_READ_WRITE_TOKEN, or <PREFIX>_BLOB_READ_WRITE_TOKEN
// when a custom prefix was chosen while connecting the store; accept both.
function blobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find((k) => k.endsWith('BLOB_READ_WRITE_TOKEN') && process.env[k]);
  return key ? process.env[key] : null;
}
// Stores connected through Vercel's OIDC federation expose BLOB_STORE_ID instead of a token.
const blobMode = () => !!(blobToken() || process.env.BLOB_STORE_ID);
// Browser upload flow: "presigned" (works with OIDC or a token) needs the webhook key Vercel
// injects with the store; otherwise fall back to the classic client-token flow.
const blobFlow = () => (process.env.BLOB_WEBHOOK_PUBLIC_KEY ? 'presigned' : 'token');
// SDK auth options: pass the read-write token when we have one, otherwise let the SDK use OIDC.
const sdkAuth = () => (blobToken() ? { token: blobToken() } : {});

function slugName(originalname, mimetype) {
  const base =
    path
      .basename(originalname, path.extname(originalname))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40) || 'file';
  return `${base}-${crypto.randomBytes(4).toString('hex')}${ALLOWED[mimetype] || ''}`;
}

function adminFromClientPayload(clientPayload) {
  let token = null;
  try {
    token = JSON.parse(clientPayload || '{}').token;
  } catch {
    token = null;
  }
  return verifyToken(token); // throws when missing/invalid
}

// ---------- disk mode ----------
const diskUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => cb(null, slugName(file.originalname, file.mimetype)),
  }),
  limits: { fileSize: MAX_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED[file.mimetype]) return cb(new Error('Only images, PDF and MP4 files are allowed'));
    cb(null, true);
  },
}).single('file');

function listDisk() {
  if (!fs.existsSync(UPLOAD_DIR)) return [];
  return fs
    .readdirSync(UPLOAD_DIR)
    .filter((f) => !f.startsWith('.'))
    .map((f) => {
      const stat = fs.statSync(path.join(UPLOAD_DIR, f));
      return { name: f, url: `/uploads/${f}`, size: stat.size, modified: stat.mtime };
    })
    .sort((a, b) => b.modified - a.modified);
}

// ---------- blob mode ----------
async function blobHandle(req, res) {
  const { handleUpload, handleUploadPresigned } = require('@vercel/blob/client');
  const { issueSignedToken } = require('@vercel/blob');
  const constraints = { allowedContentTypes: Object.keys(ALLOWED), maximumSizeInBytes: MAX_BYTES };
  const eventType = (req.body && req.body.type) || '';
  // An admin page loaded before a deploy may still use the classic client-token flow.
  if (eventType === 'blob.generate-client-token' && !blobToken()) {
    return res.status(400).json({ message: 'The admin page is out of date. Please reload it (Ctrl+F5) and try again.' });
  }
  try {
    let json;
    if (blobFlow() === 'presigned' && eventType !== 'blob.generate-client-token') {
      json = await handleUploadPresigned({
        body: req.body,
        request: req,
        getSignedToken: async (pathname, clientPayload) => {
          adminFromClientPayload(clientPayload);
          const token = await issueSignedToken({
            ...sdkAuth(),
            pathname: '*', // the final name gets a random suffix, so scope by type/size/time instead
            operations: ['put'],
            validUntil: Date.now() + 15 * 60 * 1000,
            ...constraints,
          });
          return { token, urlOptions: { ...constraints, addRandomSuffix: true, tokenPayload: JSON.stringify({ pathname }) } };
        },
        onUploadCompleted: async () => {},
      });
    } else {
      json = await handleUpload({
        body: req.body,
        request: req,
        ...sdkAuth(),
        onBeforeGenerateToken: async (pathname, clientPayload) => {
          adminFromClientPayload(clientPayload);
          return { ...constraints, addRandomSuffix: true, tokenPayload: JSON.stringify({ pathname }) };
        },
        // Nothing to persist here: the editor stores the returned URL itself.
        onUploadCompleted: async () => {},
      });
    }
    res.json(json);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Upload failed' });
  }
}

async function listBlob() {
  const { list } = require('@vercel/blob');
  const out = [];
  let cursor;
  do {
    const page = await list({ prefix: 'uploads/', limit: 1000, cursor, ...sdkAuth() });
    for (const b of page.blobs) {
      out.push({ name: b.pathname.replace(/^uploads\//, ''), url: b.url, size: b.size, modified: b.uploadedAt });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out.sort((a, b) => new Date(b.modified) - new Date(a.modified));
}

// ---------- routes ----------
router.get('/config', (req, res) => {
  res.json({
    mode: blobMode() ? 'blob' : 'disk',
    flow: blobMode() ? blobFlow() : null,
    maxBytes: MAX_BYTES,
    accept: Object.keys(ALLOWED),
  });
});

router.post('/', (req, res, next) => {
  if (blobMode()) return blobHandle(req, res);
  return requireAuth(req, res, () =>
    diskUpload(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: 'No file received' });
      res.status(201).json({ url: `/uploads/${req.file.filename}`, name: req.file.originalname, size: req.file.size });
    })
  );
});

router.get('/', requireAuth, async (req, res) => {
  res.json(blobMode() ? await listBlob() : listDisk());
});

router.delete('/', requireAuth, async (req, res) => {
  const url = String(req.query.url || '');
  if (!url) return res.status(400).json({ message: 'Missing url' });
  if (blobMode()) {
    let host = '';
    try {
      host = new URL(url).hostname;
    } catch {
      host = '';
    }
    if (!host.endsWith(BLOB_HOST_SUFFIX)) return res.status(400).json({ message: 'Not a media file of this site' });
    const { del } = require('@vercel/blob');
    await del(url, sdkAuth());
    return res.json({ ok: true });
  }
  const name = path.basename(new URL(url, 'http://local').pathname);
  const target = path.join(UPLOAD_DIR, name);
  if (!fs.existsSync(target)) return res.status(404).json({ message: 'File not found' });
  fs.unlinkSync(target);
  res.json({ ok: true });
});

module.exports = router;
