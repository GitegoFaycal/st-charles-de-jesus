// Tiny JSON-file database. Keeps everything in backend/data/db.json so the
// site runs with zero external services. Swap for Mongo/Postgres later if needed.
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const seed = require('./seed');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

let db = null;

function ensureAdminUser(data) {
  if (!Array.isArray(data.users) || data.users.length === 0) {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin1234';
    data.users = [
      {
        id: 'admin',
        username,
        name: 'Site Administrator',
        passwordHash: bcrypt.hashSync(password, 10),
        createdAt: new Date().toISOString(),
      },
    ];
    console.log(`[db] Created default admin user "${username}". Change the password after first login.`);
  }
}

function load() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (err) {
      console.error('[db] db.json is corrupt, re-seeding. Backup saved as db.corrupt.json');
      fs.copyFileSync(DB_FILE, path.join(DATA_DIR, 'db.corrupt.json'));
      db = null;
    }
  }
  if (!db) {
    db = JSON.parse(JSON.stringify(seed));
  }
  // Fill in any sections missing from an older db.json with seed defaults.
  for (const key of Object.keys(seed)) {
    if (db[key] === undefined) db[key] = JSON.parse(JSON.stringify(seed[key]));
  }
  for (const key of ['inquiries', 'applications', 'concerns', 'users']) {
    if (!Array.isArray(db[key])) db[key] = [];
  }
  ensureAdminUser(db);
  save();
  return db;
}

function save() {
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

function get() {
  if (!db) load();
  return db;
}

module.exports = { get, save, load, DB_FILE };
