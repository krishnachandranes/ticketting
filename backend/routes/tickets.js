const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Helper function to read tickets from JSON file
const readTickets = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/tickets.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write tickets to JSON file
const writeTickets = async (tickets) => {
  await fs.writeFile(
    path.join(__dirname, '../data/tickets.json'),
    JSON.stringify(tickets, null, 2)
  );
};

// GET /api/tickets - Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await readTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET /api/tickets/:id - Get single ticket
router.get('/:id', async (req, res) => {
  try {
    const tickets = await readTickets();
    const ticket = tickets.find(t => t.id === req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// POST /api/tickets - Create new ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;
    
    // Validation
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    const tickets = await readTickets();
    const newTicket = {
      id: uuidv4(),
      title,
      description,
      priority: priority || 'Medium',
      status: 'Open',
      assignedTo: assignedTo || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tickets.push(newTicket);
    await writeTickets(tickets);
    
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// PUT /api/tickets/:id - Update ticket
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;
    
    const tickets = await readTickets();
    const ticketIndex = tickets.findIndex(t => t.id === req.params.id);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    // Update ticket
    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      title: title || tickets[ticketIndex].title,
      description: description || tickets[ticketIndex].description,
      priority: priority || tickets[ticketIndex].priority,
      status: status || tickets[ticketIndex].status,
      assignedTo: assignedTo !== undefined ? assignedTo : tickets[ticketIndex].assignedTo,
      updatedAt: new Date().toISOString()
    };
    
    await writeTickets(tickets);
    res.json(tickets[ticketIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// DELETE /api/tickets/:id - Delete ticket
router.delete('/:id', async (req, res) => {
  try {
    const tickets = await readTickets();
    const ticketIndex = tickets.findIndex(t => t.id === req.params.id);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    tickets.splice(ticketIndex, 1);
    await writeTickets(tickets);
    
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

module.exports = router;

