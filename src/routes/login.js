const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { loadUsers } = require('../utils/fileHandler');
const { generateQRCode } = require('../utils/authUtils');
const speakeasy = require('speakeasy');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required!');
  }

  try {
    const users = loadUsers();
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid username or password!');
    }

    // Generate a unique token using speakeasy
    const secret = speakeasy.generateSecret();
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });

    // Save the secret to the user's record
    user.secret = secret.base32;

    // Console log the secret and token for testing
    console.log(`Generated Secret: ${secret.base32}`);
    console.log(`Generated Token: ${token}`);

    // Generate a QR code for the token
    const dataUrl = await generateQRCode(token);

    res.render('auth', {
      dataUrl,
      token,
      username,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
