const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/ensureAuth');

router.get('/', ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;