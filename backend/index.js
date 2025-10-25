const express = require('express');
const cors = require('cors');
const path = require('path');

const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tickets', authMiddleware, ticketsRouter);
app.use('/api/users', authMiddleware, usersRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Ticketing System API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
