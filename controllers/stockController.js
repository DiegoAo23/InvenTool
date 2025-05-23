// Importa el modelo de producto y alertas
const Product = require('../models/Product');
const Alert = require('../models/Alert');

const getLowStockProducts = async (req, res) => {
  try {
    // Busca productos donde el stock actual es menor o igual al mínimo permitido
    const lowStockProducts = await Product.find({ $expr: { $lte: ["$stock", "$min_stock"] } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos con bajo stock' });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().populate('product');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alertas' });
  }
};

module.exports = { getLowStockProducts, getAlerts };