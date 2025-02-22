const Empresa = require('../models/empresa');

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.create(req.body);
    res.status(201).json({ success: true, data: empresa });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener todas las empresas activas
exports.obtenerEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({ where: { activa: 'activo' } });
    res.status(200).json({ success: true, data: empresas });
  } catch (error) {
    console.error('Error al obtener empresas activas:', error);
        res.status(500).json({ success: false, error: error.message });
  }
};


// Obtener una empresa por ID
exports.obtenerEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    }
    res.status(200).json({ success: true, data: empresa });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar una empresa
exports.actualizarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    }
    await empresa.update(req.body);
    res.status(200).json({ success: true, data: empresa });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Suspender una empresa (actualizar el campo activo)
exports.suspenderEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    }
    await empresa.update({ activa: 'suspendido' });
    res.status(200).json({ success: true, data: empresa });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar una empresa
exports.eliminarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    if (!empresa) {
      return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    }
    await empresa.destroy();
    res.status(200).json({ success: true, message: 'Empresa eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
