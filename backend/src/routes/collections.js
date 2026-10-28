// Generic CRUD for list-type content (news, programs, testimonials, ...).
const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { requireAuth } = require('../auth');
const { COLLECTIONS } = require('../schema');

const router = express.Router();

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function ensureUniqueSlug(list, base, ignoreId) {
  let slug = base || crypto.randomUUID().slice(0, 8);
  let n = 2;
  while (list.some((i) => i.slug === slug && i.id !== ignoreId)) slug = `${base}-${n++}`;
  return slug;
}

router.param('name', (req, res, next, name) => {
  if (!COLLECTIONS.includes(name)) return res.status(404).json({ message: 'Unknown collection' });
  const data = db.get();
  if (!Array.isArray(data[name])) data[name] = [];
  req.collection = data[name];
  req.collectionName = name;
  next();
});

router.get('/:name', (req, res) => res.json(req.collection));

router.get('/:name/:id', (req, res) => {
  const item = req.collection.find((i) => i.id === req.params.id || i.slug === req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.post('/:name', requireAuth, (req, res) => {
  const body = req.body || {};
  const item = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (body.title || body.name) {
    item.slug = ensureUniqueSlug(req.collection, slugify(body.slug || body.title || body.name));
  }
  if (item.order === undefined) item.order = req.collection.length;
  req.collection.push(item);
  db.save();
  res.status(201).json(item);
});

router.put('/:name/:id', requireAuth, (req, res) => {
  const idx = req.collection.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const body = req.body || {};
  const merged = { ...req.collection[idx], ...body, id: req.params.id, updatedAt: new Date().toISOString() };
  if (merged.title || merged.name) {
    merged.slug = ensureUniqueSlug(req.collection, slugify(body.slug || merged.slug || merged.title || merged.name), merged.id);
  }
  req.collection[idx] = merged;
  db.save();
  res.json(merged);
});

router.put('/:name', requireAuth, (req, res) => {
  // Reorder: body = [ids in new order]
  const ids = Array.isArray(req.body) ? req.body : [];
  ids.forEach((id, order) => {
    const item = req.collection.find((i) => i.id === id);
    if (item) item.order = order;
  });
  req.collection.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  db.save();
  res.json(req.collection);
});

router.delete('/:name/:id', requireAuth, (req, res) => {
  const idx = req.collection.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  req.collection.splice(idx, 1);
  db.save();
  res.json({ ok: true });
});

module.exports = router;
