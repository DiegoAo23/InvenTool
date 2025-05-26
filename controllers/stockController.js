// Importa el modelo de producto y alertas
const Product = require('../models/Product');
const Alert = require('../models/Alert');
const Movement = require('../models/Movement');

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

const createMovement = async (req, res) => {
  try {
    const { productId, type, quantity, user } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    // Actualiza el stock
    if (type === 'entrada') product.stock += quantity;
    else if (type === 'salida') product.stock -= quantity;
    await product.save();

    // Crea el movimiento
    const movement = new Movement({ product: productId, type, quantity, user });
    await movement.save();

    res.status(201).json({ message: 'Movimiento registrado', movement });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar movimiento', error });
  }
};

const getMovements = async (req, res) => {
  try {
    const movements = await Movement.find().populate('product').sort({ date: -1 });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error });
  }
};


module.exports = { getLowStockProducts, getAlerts, createMovement, getMovements };