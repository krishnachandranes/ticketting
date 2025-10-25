const fs = require('fs').promises;
const path = require('path');

// Mock token storage (in a real app, this would be in a database)
const mockTokens = new Map();

// Helper function to read users from JSON file
const readUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Generate a mock token
const generateMockToken = (userId) => {
  const token = `mock-token-${userId}-${Date.now()}`;
  mockTokens.set(token, userId);
  return token;
};

// Validate a mock token
const validateMockToken = (token) => {
  return mockTokens.has(token);
};

// Get user ID from token
const getUserIdFromToken = (token) => {
  return mockTokens.get(token);
};

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token required' });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!validateMockToken(token)) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    // Get user information
    const userId = getUserIdFromToken(token);
    const users = await readUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add user info to request object
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};

module.exports = {
  authMiddleware,
  generateMockToken,
  validateMockToken,
  getUserIdFromToken
};

