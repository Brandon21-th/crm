const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresacontroller');

router.post('/empresas', empresaController.crearEmpresa);
router.get('/empresas', empresaController.obtenerEmpresas);
router.get('/empresas/:id', empresaController.obtenerEmpresa);
router.put('/empresas/:id', empresaController.actualizarEmpresa);
router.put('/empresas/:id/suspender', empresaController.suspenderEmpresa);

module.exports = router;
