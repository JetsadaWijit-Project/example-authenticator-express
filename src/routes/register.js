const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { loadUsers, saveUsers } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users.some((user) => user.username === username)) {
    return res.send('User already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const secret = speakeasy.generateSecret();

  users.push({ username, password: hashedPassword, secret: secret.base32 });
  saveUsers(users);

  qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) return res.status(500).send('Error generating QR code');
    res.render('auth', { username, dataUrl });
  });
});

module.exports = router;
