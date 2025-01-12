const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authUtils');
const { loadUsers } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/authenticate', (req, res) => {
  const { username, token } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user) return res.send('User not found!');

  const isVerified = verifyToken(user.secret, token);

  if (isVerified) {
    res.send('Authentication successful!');
  } else {
    res.send('Invalid token!');
  }
});

module.exports = router;
