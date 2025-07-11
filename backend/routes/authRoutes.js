const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash });
  await newUser.save();
  res.status(201).json({ message: 'User created' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    req.session.destroy(() => {
      res.clearCookie('sessionId');
      res.status(200).json({ message: 'Logged out' });
    });
  });
});

module.exports = router;
