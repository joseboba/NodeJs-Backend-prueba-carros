const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const User = sequelize.define('User', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{ msg: 'El nombre es requerido' }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{ msg: 'El email es requerido' }
        },
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{ msg: 'La password es requerida' }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Es necesario el usuario' }
        },
        unique: true
    }
})

module.exports = {
    User
};