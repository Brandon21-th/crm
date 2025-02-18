const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
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
    allowNull: false,
    unique: true
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
    unique: true,
    validate: {
      isEmail: true
    }
  },
  activo: {
    type: DataTypes.ENUM('activo', 'suspendido'),
    defaultValue: 'activo'
  }
});

module.exports = Empresa;
