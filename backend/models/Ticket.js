const mongoose = require('mongoose'); // Fix: Use `require` instead of `required`

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Fix: Use `String` instead of `string`
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);