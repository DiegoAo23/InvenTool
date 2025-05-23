const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['entry', 'exit'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: String
});

module.exports = mongoose.model('Movement', movementSchema);
