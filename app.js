const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stockRoutes = require('./routes/stockRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Opcional: rutas directas
app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});
app.get('/add-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'addProduct.html'));
});
app.get('/edit-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'editProduct.html'));
});
app.get('/view-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'viewProduct.html'));
});
app.get('/movements', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'movements.html'));
}); 
app.get('/alerts', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'showAlerts.html'));
});
// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/products', productRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => console.error('Error al conectar a MongoDB', err));
