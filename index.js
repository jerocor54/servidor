
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar a db
conectarDB();

//CORS
app.use(cors());
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
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