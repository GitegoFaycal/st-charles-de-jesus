// Content store. The whole site is one JSON document.
//
//  - Redis mode (production on Vercel): the document lives under one key in
//    Upstash Redis. Used automatically when UPSTASH_REDIS_REST_URL/TOKEN (or
//    the KV_REST_API_URL/TOKEN aliases) are set.
//  - File mode (local development, self-hosting): backend/data/db.json.
//
// Every request loads a fresh copy (load()) and writes it back (save(doc)).
// Known limitation: two overlapping writes (e.g. a public form submission
// landing during an admin save) are last-writer-wins. Acceptable for a
// single-admin school site.
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const seed = require('./seed');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const clone = (v) => JSON.parse(JSON.stringify(v));

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

function mode() {
  return redisConfig() ? 'redis' : 'file';
}

function key() {
  return process.env.DB_KEY || 'scj:db';
}

let redis = null;
function client() {
  if (!redis) {
    const { Redis } = require('@upstash/redis');
    redis = new Redis(redisConfig());
  }
  return redis;
}

function ensureAdminUser(data) {
  if (Array.isArray(data.users) && data.users.length > 0) return false;
  const username = process.env.ADMIN_USERNAME || 'admin';
  let password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.VERCEL) throw new Error('ADMIN_PASSWORD must be set in the environment before the first deploy');
    password = 'admin1234';
  }
  data.users = [
    {
      id: 'admin',
      username,
      name: 'Site Administrator',
      passwordHash: bcrypt.hashSync(password, 10),
      createdAt: new Date().toISOString(),
    },
  ];
  console.log(`[db] Created admin user "${username}". Change the password after first login.`);
  return true;
}

/** Fill in anything missing (older documents, empty store). Returns true if the doc changed. */
function normalize(doc) {
  let changed = false;
  for (const k of Object.keys(seed)) {
    if (doc[k] === undefined) {
      doc[k] = clone(seed[k]);
      changed = true;
    }
  }
  for (const k of ['inquiries', 'applications', 'concerns', 'users']) {
    if (!Array.isArray(doc[k])) {
      doc[k] = [];
      changed = true;
    }
  }
  if (ensureAdminUser(doc)) changed = true;
  return changed;
}

async function readRaw() {
  if (mode() === 'redis') {
    const doc = await client().get(key());
    return doc && typeof doc === 'object' ? doc : null;
  }
  if (!fs.existsSync(DB_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    console.error('[db] db.json is corrupt, re-seeding. Backup saved as db.corrupt.json');
    fs.copyFileSync(DB_FILE, path.join(DATA_DIR, 'db.corrupt.json'));
    return null;
  }
}

async function writeRaw(doc) {
  if (mode() === 'redis') {
    await client().set(key(), doc);
    return;
  }
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(doc, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

/** Load the content document (seeding the store on first use). */
async function load() {
  let doc = await readRaw();
  let changed = false;
  if (!doc) {
    doc = clone(seed);
    changed = true;
  }
  if (normalize(doc)) changed = true;
  if (changed) await writeRaw(doc);
  return doc;
}

/** Persist a document previously returned by load(). */
async function save(doc) {
  await writeRaw(doc);
}

module.exports = { load, save, mode, key, DB_FILE };
