const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const Usuario = sequelize.define(
    "Tusuario",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_sucursal: {
            type: DataTypes.INTEGER,
            references: {
                model: "Tsucursales", // Nombre de la tabla de Sucursales
                key: "id",
            },
        },
        id_empresa: {
            type: DataTypes.INTEGER,
            references: {
                model: "Empresas", // Nombre de la tabla de Empresas
                key: "id",
            },
        },
        nombre: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        apaterno: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        amaterno: {
            type: DataTypes.STRING(80),
            allowNull: true,
        },
        nombrecto: {
            type: DataTypes.STRING(180),
            allowNull: false,
        },
        tel1: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        contrasenia: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        alias: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        activo: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        chk_sueldo_base: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
        },
        sueldo: {
            type: DataTypes.DECIMAL(13, 3),
            allowNull: true,
        },
        periosidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: async (usuario) => {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            },
        },
    }
);

module.exports = Usuario;
