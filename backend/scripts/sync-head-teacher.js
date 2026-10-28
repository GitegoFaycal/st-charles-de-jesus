/* eslint-disable no-console */
// One-off: copy the head teacher's name/title/photo from the "Head teacher's
// message" page into the staff list entry (role "Head Teacher"), both in the
// live Redis document and in the local backend/data/db.json.
//   DOTENV_CONFIG_PATH=backend/.env.vercel node backend/scripts/sync-head-teacher.js
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH || path.join(__dirname, '..', '.env') });
const { Redis } = require('@upstash/redis');

function sync(doc, label) {
  const ht = doc.headTeacherMessage || {};
  const staff = doc.staff || [];
  const entry = staff.find((s) => /head teacher/i.test(s.role || '') && !/deputy/i.test(s.role || ''));
  if (!entry) {
    console.log(`${label}: no head teacher entry in staff list`);
    return false;
  }
  const before = JSON.stringify([entry.name, entry.photo]);
  if (ht.name) entry.name = ht.name;
  if (ht.photo) entry.photo = ht.photo;
  entry.updatedAt = new Date().toISOString();
  // keep the legacy home fields in step as well
  doc.home = doc.home || {};
  if (ht.name) doc.home.headTeacherName = ht.name;
  if (ht.title) doc.home.headTeacherTitle = ht.title;
  if (ht.photo) doc.home.headTeacherPhoto = ht.photo;
  const after = JSON.stringify([entry.name, entry.photo]);
  console.log(`${label}: head teacher = "${ht.name}" | staff entry ${before} -> ${after}`);
  return true;
}

(async () => {
  const LOCAL = path.join(__dirname, '..', 'data', 'db.json');
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  const KEY = process.env.DB_KEY || 'scj:db';

  let liveName = null;
  if (url && token) {
    const redis = new Redis({ url, token });
    const doc = await redis.get(KEY);
    if (!doc) throw new Error(`Nothing stored under ${KEY}`);
    liveName = doc.headTeacherMessage && doc.headTeacherMessage.name;
    if (sync(doc, 'live')) await redis.set(KEY, doc);
  }
  if (fs.existsSync(LOCAL)) {
    const doc = JSON.parse(fs.readFileSync(LOCAL, 'utf8'));
    // the live site has the newest name: carry it into the local copy too
    if (liveName) doc.headTeacherMessage.name = liveName;
    if (sync(doc, 'local')) fs.writeFileSync(LOCAL, JSON.stringify(doc, null, 2));
  }
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
