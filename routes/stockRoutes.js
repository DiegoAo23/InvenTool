const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAlerts, createMovement, getMovements } = require('../controllers/stockController');
router.get('/low-stock', getLowStockProducts);
router.get('/alerts', getAlerts);
router.post('/movements', createMovement);
router.get('/movements', getMovements);

module.exports = router;