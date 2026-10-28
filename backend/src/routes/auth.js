const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { signToken, requireAuth } = require('../auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = db.get().users.find((u) => u.username.toLowerCase() === String(username || '').toLowerCase());
  if (!user || !bcrypt.compareSync(String(password || ''), user.passwordHash)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  res.json({ token: signToken(user), user: { id: user.id, username: user.username, name: user.name } });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.get().users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(401).json({ message: 'User no longer exists' });
  res.json({ id: user.id, username: user.username, name: user.name });
});

router.put('/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const data = db.get();
  const user = data.users.find((u) => u.id === req.user.sub);
  if (!user || !bcrypt.compareSync(String(currentPassword || ''), user.passwordHash)) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  if (!newPassword || String(newPassword).length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters' });
  }
  user.passwordHash = bcrypt.hashSync(String(newPassword), 10);
  db.save();
  res.json({ ok: true });
});

router.put('/profile', requireAuth, (req, res) => {
  const { name, username } = req.body || {};
  const data = db.get();
  const user = data.users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (name) user.name = String(name).trim();
  if (username) user.username = String(username).trim();
  db.save();
  res.json({ id: user.id, username: user.username, name: user.name, token: signToken(user) });
});

module.exports = router;
