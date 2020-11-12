const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/config');
const { User } = require('./models/user.model');
const { Car } = require('./models/car.model');
require('dotenv').config();



//Crear el servidor de express
const app = express();

//Base de datos
connectDB();
User.hasMany(Car);
Car.belongsTo(User);


//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use('/car', require('./routes/car.routes'));
app.use('/user', require('./routes/user.routes'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`)
})