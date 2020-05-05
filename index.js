
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar a db
conectarDB();


// Configurar cabeceras y cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//Habilitar express.json()
app.use(express.json({ extended: true }));

//Puerto de la app
const port = process.env.port || 4000;

//Importar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/usuarios'));
app.use('/api', require('./routes/proyectos'));
app.use('/api', require('./routes/tareas'));

//Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`);
});