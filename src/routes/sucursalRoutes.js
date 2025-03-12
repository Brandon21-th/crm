const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.post('/sucursales', sucursalController.crearSucursal);
router.get('/sucursales', sucursalController.obtenerSucursales);
router.get('/sucursales/:id', sucursalController.obtenerSucursal);
router.put('/sucursales/:id', sucursalController.actualizarSucursal);
router.put('/sucursales/:id/suspender', sucursalController.suspenderSucursal);

module.exports = router;