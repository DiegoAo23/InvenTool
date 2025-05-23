const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stock: { type: Number, required: true },
  triggeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);