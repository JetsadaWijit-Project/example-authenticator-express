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

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const verifyToken = (secret, token) => {
  try {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1, // Adjust window as needed (e.g., 1 allows ±30 seconds)
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

module.exports = { generateQRCode, generateRandomString, verifyToken };
