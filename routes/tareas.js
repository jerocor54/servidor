const express = require('express');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const tareaController = require('../controllers/tareaController');

const router = express.Router();

router.post('/tarea', 
    auth,
    [
        check('nombre', 'El nombre es obligatoio').not().isEmpty(),
        check('proyectoId', 'El proyecto es obligatoio').not().isEmpty(),
    ], 
    tareaController.crearTarea);

    router.get('/tareas', auth, tareaController.obtenerTareas);
    router.put('/tarea/:id', auth, tareaController.actualizarTarea);
    router.delete('/tarea/:id', auth, tareaController.eliminarTarea);

module.exports = router;