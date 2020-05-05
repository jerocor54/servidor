
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar a db
conectarDB();

//CORS
app.use(cors());

//Habilitar express.json()
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/usuarios'));
app.use('/api', require('./routes/proyectos'));
app.use('/api', require('./routes/tareas'));

//Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto: ${PORT}`);
});