const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { loadUsers } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send('Invalid username or password!');
  }

  res.render('auth', { username });
});

module.exports = router;
