/* eslint-disable no-console */
// Copies the local content database (backend/data/db.json) to Upstash Redis,
// or downloads the remote document for a backup.
//
//   node backend/scripts/push-db.js            # push (refuses if the key already exists)
//   node backend/scripts/push-db.js --force    # push and overwrite (a backup of the remote doc is written first)
//   node backend/scripts/push-db.js --pull     # download the remote doc to backend/data/db.remote.json
//
// Credentials come from the environment or backend/.env (UPSTASH_REDIS_REST_URL
// and UPSTASH_REDIS_REST_TOKEN, or the KV_REST_API_* aliases). Get them with
// `npx vercel env pull backend/.env.vercel` and copy the two lines over, or run
// with DOTENV_CONFIG_PATH=backend/.env.vercel.
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH || path.join(__dirname, '..', '.env') });
const { Redis } = require('@upstash/redis');

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
if (!url || !token) {
  console.error('Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN first.');
  process.exit(1);
}
const KEY = process.env.DB_KEY || 'scj:db';
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL = path.join(DATA_DIR, 'db.json');
const args = process.argv.slice(2);

(async () => {
  const redis = new Redis({ url, token });
  const remote = await redis.get(KEY);

  if (args.includes('--pull')) {
    if (!remote) throw new Error(`Nothing stored under ${KEY}`);
    const out = path.join(DATA_DIR, 'db.remote.json');
    fs.writeFileSync(out, JSON.stringify(remote, null, 2));
    console.log(`Downloaded ${KEY} to ${out}`);
    return;
  }

  if (!fs.existsSync(LOCAL)) throw new Error(`${LOCAL} not found. Run the site locally once to create it.`);
  const local = JSON.parse(fs.readFileSync(LOCAL, 'utf8'));
  if (remote) {
    const backup = path.join(DATA_DIR, 'db.remote.backup.json');
    fs.writeFileSync(backup, JSON.stringify(remote, null, 2));
    if (!args.includes('--force')) {
      throw new Error(`${KEY} already exists in Redis (backup written to ${backup}). Re-run with --force to overwrite.`);
    }
    console.log(`Existing remote document backed up to ${backup}`);
  }
  await redis.set(KEY, local);
  console.log(`Pushed ${Object.keys(local).length} sections (${JSON.stringify(local).length} bytes) to ${KEY}`);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
