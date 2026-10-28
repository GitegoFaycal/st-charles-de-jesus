// Public forms: contact inquiries, online applications, "report a concern".
const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { requireAuth } = require('../auth');

const router = express.Router();
const TYPES = {
  inquiries: ['name', 'email', 'message'],
  applications: ['studentName', 'guardianPhone', 'program'],
  concerns: ['category', 'details'],
};
const MAX_PER_TYPE = 1000;

function clean(value, max = 4000) {
  return String(value ?? '').trim().slice(0, max);
}

router.param('type', (req, res, next, type) => {
  if (!TYPES[type]) return res.status(404).json({ message: 'Unknown submission type' });
  const data = req.db;
  if (!Array.isArray(data[type])) data[type] = [];
  req.list = data[type];
  req.type = type;
  next();
});

router.post('/:type', async (req, res) => {
  const body = req.body || {};
  const missing = TYPES[req.type].filter((f) => !clean(body[f]));
  if (missing.length) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new' };
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === 'string') record[k] = clean(v);
    else if (typeof v === 'number' || typeof v === 'boolean') record[k] = v;
  }
  req.list.unshift(record);
  if (req.list.length > MAX_PER_TYPE) req.list.length = MAX_PER_TYPE;
  await db.save(req.db);
  res.status(201).json({ ok: true, id: record.id });
});

router.get('/:type', requireAuth, (req, res) => res.json(req.list));

router.patch('/:type/:id', requireAuth, async (req, res) => {
  const item = req.list.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  if (req.body?.status) item.status = clean(req.body.status, 40);
  if (req.body?.note !== undefined) item.note = clean(req.body.note, 2000);
  await db.save(req.db);
  res.json(item);
});

router.delete('/:type/:id', requireAuth, async (req, res) => {
  const idx = req.list.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  req.list.splice(idx, 1);
  await db.save(req.db);
  res.json({ ok: true });
});

module.exports = router;
