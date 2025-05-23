const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAlerts } = require('../controllers/stockController');

router.get('/low-stock', getLowStockProducts);
router.get('/alerts', getAlerts);

module.exports = router;