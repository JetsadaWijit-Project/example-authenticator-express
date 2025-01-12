const speakeasy = require('speakeasy');

const verifyToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
};

module.exports = { verifyToken };
