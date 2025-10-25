const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Helper function to read users from JSON file
const readUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;

