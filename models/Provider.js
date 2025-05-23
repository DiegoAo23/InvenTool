const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: String,
  contact_name: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('Provider', providerSchema);
