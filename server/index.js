// Importar Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require("./config");

// Necesaria para las variables de entorno
require('dotenv').config({path: 'variables.env'});

// Verificando si se puede conectar a la base de datos
// const db = require('./config/database');

// db.authenticate()
//    .then(() => console.log('DB Conectada'))
//    .catch(error => console.log(error));

// Configurar Express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Añadir las vistas 
app.set('views', path.join(__dirname, './views'));

// Cargar una carpeta estática llamada public
app.use(express.static('public'));

// Validar si estamos en desarrollo o producción
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // Crear nueva fecha
    const fecha = new Date();
    // Locals para poder pasar la información entre las diferentes pantallas (Es como un SESSION de PHP)
    res.locals.fechaActual = fecha.getFullYear();
    // Retornar lo que esta en el link (muestra lo que está después de la diagonal)
    res.locals.ruta = req.path;
    // Para que continue ejecutando la siguiente función
    return next();
});

// Ejecutamos el bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas
app.use('/', routes());

// app.listen(3000);
// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0'; //En caso de que haya el host 'localhost' lo asigne, si no, se deja el espacio libre para que Heroku lo asigne
const port = process.env.PORT || 3000; //Se asigna el puerto por Heroku, si no, se asigna el puerto 3000

app.listen(port, host, () => {
    console.log('El servidor está funcionando');
});