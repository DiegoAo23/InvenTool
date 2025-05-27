const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['entrada', 'salida'], required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String}
});

module.exports = mongoose.model('Movement', movementSchema);
