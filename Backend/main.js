require('dotenv').config();
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage (temporary)
let passwords = [];

// Get all stored passwords
app.get('/', (req, res) => {
  res.json(passwords);
});

// Save a new password
app.post('/', (req, res) => {
  try {
    const newPassword = req.body;
    passwords.push(newPassword);

    res.json({ message: "Password saved successfully!", data: newPassword });
  } catch (error) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

// Delete a password
app.delete('/', (req, res) => {
  try {
    const { id } = req.body;
    passwords = passwords.filter(item => item.id !== id);

    res.json({ message: "Password deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete password" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
