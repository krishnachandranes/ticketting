const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { generateMockToken } = require('../middleware/authMiddleware');

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

// POST /api/login - Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const users = await readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate mock token
    const token = generateMockToken(user.id);
    
    // Return success response
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// POST /api/logout - Logout endpoint (optional, for completeness)
router.post('/logout', (req, res) => {
  // In a real app, you might invalidate the token here
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;

