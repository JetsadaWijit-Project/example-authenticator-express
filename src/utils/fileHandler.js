const fs = require('fs');
const filePath = './data/users.json';

const loadUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
};

const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

module.exports = { loadUsers, saveUsers };
