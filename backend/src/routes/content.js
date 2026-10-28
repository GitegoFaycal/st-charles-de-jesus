// Single-object content sections (settings, home, about, ...) and the
// one-shot public payload the frontend loads on start.
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../auth');
const { SECTIONS, COLLECTIONS } = require('../schema');

const router = express.Router();

router.get('/', (req, res) => {
  const data = db.get();
  const payload = {};
  for (const s of SECTIONS) payload[s] = data[s];
  for (const c of COLLECTIONS) payload[c] = data[c] || [];
  res.json(payload);
});

router.get('/:section', (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) return res.status(404).json({ message: 'Unknown section' });
  res.json(db.get()[section]);
});

router.put('/:section', requireAuth, (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.includes(section)) return res.status(404).json({ message: 'Unknown section' });
  const data = db.get();
  data[section] = { ...data[section], ...(req.body || {}), updatedAt: new Date().toISOString() };
  db.save();
  res.json(data[section]);
});

module.exports = router;
