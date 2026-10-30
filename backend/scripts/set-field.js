/* eslint-disable no-console */
// Sets one field in the content document, in the local db.json and (when
// Upstash credentials are available) in the live Redis document.
//   DOTENV_CONFIG_PATH=backend/.env.vercel node backend/scripts/set-field.js about.patronImage /uploads/patron.jpg
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH || path.join(__dirname, '..', '.env') });

const [dotted, value] = process.argv.slice(2);
if (!dotted || value === undefined) {
  console.error('usage: node set-field.js <section.field> <value>');
  process.exit(1);
}
const [section, field] = dotted.split('.');

function apply(doc, label) {
  if (!doc[section] || typeof doc[section] !== 'object') throw new Error(`${label}: unknown section "${section}"`);
  const before = doc[section][field];
  doc[section][field] = value;
  doc[section].updatedAt = new Date().toISOString();
  console.log(`${label}: ${dotted} ${JSON.stringify(before)} -> ${JSON.stringify(value)}`);
}

(async () => {
  const LOCAL = path.join(__dirname, '..', 'data', 'db.json');
  if (fs.existsSync(LOCAL)) {
    const doc = JSON.parse(fs.readFileSync(LOCAL, 'utf8'));
    apply(doc, 'local');
    fs.writeFileSync(LOCAL, JSON.stringify(doc, null, 2));
  }
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    const { Redis } = require('@upstash/redis');
    const redis = new Redis({ url, token });
    const KEY = process.env.DB_KEY || 'scj:db';
    const doc = await redis.get(KEY);
    if (!doc) throw new Error(`Nothing stored under ${KEY}`);
    apply(doc, 'live');
    await redis.set(KEY, doc);
  } else {
    console.log('live: skipped (no Upstash credentials in environment)');
  }
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
