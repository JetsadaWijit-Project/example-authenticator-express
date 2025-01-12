const fs = require('fs');
const filePath = './data/users.json';

const loadUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
};

// Function to ensure the file exists
function ensureFileExists(filePath, defaultContent = '[]') {
  const dir = path.dirname(filePath);

  // Create directories along the path if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create the file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, 'utf8');
  }
}

const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

module.exports = { ensureFileExists, loadUsers, saveUsers };
