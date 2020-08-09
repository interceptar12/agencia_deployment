const Sequelize = require('sequelize');
// Configuración para las variables de entorno
require('dotenv').config({path: 'variables.env'});


module.exports = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    // Configuración propia de Sequelize
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
})