const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'carros',
    dialect: 'mysql',
    host: 'localhost',
    password: 'admin',
    username: 'root'
})

const connectDB = async() => {

    try {
        await sequelize.sync({ alter: false });
        console.log('Conectado')
    } catch (error) {
        console.log(error)
    }

}

module.exports = {

    connectDB,
    sequelize

};