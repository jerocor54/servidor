const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

router.post('/usuario',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
],
 usuarioController.crearUsuario);

module.exports = router;