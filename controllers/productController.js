const Product = require('../models/Product');
const Provider = require('../models/Provider');
const Alert = require('../models/Alert');
// ...otros métodos...

exports.createProduct = async (req, res) => {
  try {
    const {
      name, sku, category, location, stock, min_stock, max_stock,
      provider
    } = req.body;

    // provider es un objeto: { name, contact_name, email, phone }
    let providerDoc = await Provider.findOne({ name: { $regex: new RegExp('^' + provider.name + '$', 'i') } });

    if (!providerDoc) {
      providerDoc = new Provider({
        name: provider.name,
        contact_name: provider.contact_name,
        email: provider.email,
        phone: provider.phone
      });
      await providerDoc.save();
    }

    // Crear producto
    const product = new Product({
      name,
      sku,
      category,
      location,
      stock,
      min_stock,
      max_stock,
      provider_id: providerDoc._id
    });

    await product.save();

    // Crear alerta si corresponde
    if (stock <= min_stock) {
      await Alert.create({
        product: product._id,
        stock: stock
      });
    }

    res.status(201).json({ message: 'Producto y proveedor creados', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto/proveedor', error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Si usas autenticación, asegúrate de tener req.user.id
    // Si no, usa {} para traer todos
    const products = await Product.find({}).populate('provider_id');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener un producto por id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('provider_id');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, location,min_stock, max_stock,stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, location, min_stock, max_stock,stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado', product });

        // 🚨 Si el stock es menor al mínimo permitido, genera una alerta
    if (stock < min_stock) {
      // Crea la alerta solo si no existe una alerta previa para este producto con el mismo stock
      const existingAlert = await Alert.findOne({ product: product._id, stock });
      if (!existingAlert) {
        await Alert.create({
          product: product._id,
          stock,
          triggeredAt: new Date()
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

// En tu controlador productController.js
exports.updateStock = async (req, res) => {
  try {
    const {stock} = req.body;
    if (stock === undefined || isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock inválido' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params._id,
      { stock }
    );

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Stock actualizado correctamente', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar stock', error });
  }
};


// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};