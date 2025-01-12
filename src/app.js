const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { ensureFileExists } = require('./utils/fileHandler')

// Define the file path
const filePath = path.join(__dirname, 'data', 'users.json');

// Ensure the file exists
ensureFileExists(filePath);

const app = express();

const hostUrl = process.env.HOST_URL || "localhost";
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://${hostUrl}:${PORT}`);
});
