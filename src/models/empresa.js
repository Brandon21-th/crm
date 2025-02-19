const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('tempresa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_empresa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  domicilio_empresa: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  nombre_contacto: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  tel_contacto: {
    type: DataTypes.STRING(18),
    allowNull: true
  },
  email_contacto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  activa: {
    type: DataTypes.ENUM('activo', 'suspendido'),
    defaultValue: 'activo'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

module.exports = Empresa;
