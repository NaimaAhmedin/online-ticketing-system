const express = require('express');
const { createTicket, getTickets, updateTicket } = require('../controllers/ticketController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/tickets', authMiddleware, createTicket);
router.get('/tickets', authMiddleware, getTickets);
router.put('/tickets/:id', authMiddleware, isAdmin, updateTicket);

module.exports = router;