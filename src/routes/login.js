const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { loadUsers, saveUsers } = require('../utils/fileHandler');
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
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex === -1 || !(await bcrypt.compare(password, users[userIndex].password))) {
      return res.status(401).send('Invalid username or password!');
    }

    // Reuse existing secret or generate a new one
    let user = users[userIndex];
    if (!user.secret) {
      const secret = speakeasy.generateSecret();
      user.secret = secret.base32;
      users[userIndex] = user;
      saveUsers(users); // Save updated user data
    }

    const token = speakeasy.totp({
      secret: user.secret,
      encoding: 'base32',
    });

    // Console log the secret and token for testing
    //console.log(`Generated Token: ${token}`);

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
