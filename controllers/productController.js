const Product = require('../models/Product');
const Alert = require('../models/Alert');

const createProduct = async (req, res) => {
  try {
    const { name, sku, stock, min_stock, max_stock } = req.body;
    const newProduct = new Product({ name, sku, stock, min_stock, max_stock });
    await newProduct.save();

     if (stock <= min_stock) {
      await Alert.create({ product: newProduct._id, stock });
    }

    res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

module.exports = { createProduct };