const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: String,
  location: String,
  stock: { type: Number, default: 0 },
  min_stock: { type: Number, default: 0 },
  max_stock: Number,
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
});

module.exports = mongoose.model('Product', productSchema);
