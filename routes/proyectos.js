const express = require('express');
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const router = express.Router();

router.post('/proyecto', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto);

router.get('/proyectos', auth, proyectoController.obtenerProyectos);

router.put('/proyecto/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    ], 
    proyectoController.actualizarProyecto);

    router.delete('/proyecto/:id', auth, proyectoController.eliminarProyecto);

module.exports = router;