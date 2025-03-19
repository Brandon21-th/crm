const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');

exports.crearSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursal.create(req.body);
        res.status(201).json(sucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.findAll({
            where: { activa: '1' },
            include: {
                model: Empresa,
                attributes: ['nombre_empresa'] 
            }
        });
        res.status(200).json({ success: true, data: sucursales });
    } catch (error) {
        console.error('Error al obtener sucursales activas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.obtenerSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursal.findByPk(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursal.findByPk(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        await sucursal.update(req.body);
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.suspenderSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursal.findByPk(req.params.id);
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        sucursal.activa = '0'; // O el valor que corresponda para suspender
        await sucursal.save();
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};