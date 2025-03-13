const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empresa = require('./empresa'); // Importar el modelo Empresa
const Sucursal = sequelize.define('tsucursale', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Empresa,
            key: 'id'
        }
    },
    nombre_sucursal: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tiempo_sesion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sloganEmpresa_Sel: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    includeInfoFiscal: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    rfc_fiscal: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    email_fiscal: {
        type: DataTypes.STRING(40),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    razon_social: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    calle_fiscal: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    num_exterior_fiscal: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    num_interior_fiscal: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    colonia_fiscal: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    localidad_fiscal: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    municipio_fiscal: {
        type: DataTypes.STRING(35),
        allowNull: true
    },
    id_estado_fiscal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cp_fiscal: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    regimen: {
        type: DataTypes.STRING(90),
        allowNull: true
    },
    serie: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    noaprobacion: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    no_certificado: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    passwCertificado: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    activa: {
        type: DataTypes.STRING(2),
        allowNull: false
    }
}, {
    timestamps: false
});

// Definir la relación de llave foránea
Sucursal.belongsTo(Empresa, { foreignKey: 'id_empresa' });

module.exports = Sucursal;