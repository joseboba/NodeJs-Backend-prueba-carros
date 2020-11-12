const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'La marca es requerida' }
        }
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'El modelo es requerido' }
        }
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'El año es requerido' }
        }
    },
    placa: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'La placa es requerida' }
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'EL estado es requerido' },
            isIn: [
                ['Perfecto', 'Daño menor', 'Reparación urgente', 'En reparación', 'Descarte']
            ]
        },
    }
})

module.exports = {
    Car
}