// Single-object content sections (settings, home, about, ...) and the
// one-shot public payload the frontend loads on start.
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');
const { SECTIONS, COLLECTIONS } = require('../schema');

const router = express.Router();

router.get('/', (req, res) => {
  const data = req.db;
  const payload = {};
  for (const s of SECTIONS) payload[s] = data[s];
  for (const c of COLLECTIONS) payload[c] = data[c] || [];
  res.json(payload);
});

router.get('/:section', (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) return res.status(404).json({ message: 'Unknown section' });
  res.json(req.db[section]);
});

router.put('/:section', requireAuth, async (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) return res.status(404).json({ message: 'Unknown section' });
  const data = req.db;
  data[section] = { ...data[section], ...(req.body || {}), updatedAt: new Date().toISOString() };
  await db.save(data);
  res.json(data[section]);
});

module.exports = router;
