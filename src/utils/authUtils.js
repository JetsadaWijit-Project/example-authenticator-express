const qrcode = require('qrcode');
const speakeasy = require('speakeasy');

const generateQRCode = async (text) => {
  try {
    const dataUrl = await qrcode.toDataURL(text);
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};

const verifyToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
};

module.exports = { generateQRCode, verifyToken };
