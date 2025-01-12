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

  if (!user || !user.secret) {
    return res.status(401).send('User not found or no token registered!');
  }

  const isVerified = verifyToken(user.secret, token);

  if (isVerified) {
    res.send('Authentication successful!');
  } else {
    res.status(403).send('Invalid token!');
  }
});

module.exports = router;
