const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUsuario = async (req, res) => {
     //Revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(200).send({
             errores: errores.array()
         })
     }

     //Extraer el email y password
     const { email, password } = req.body;
     try {
         let usuario = await Usuario.findOne({ email });
         if(!usuario){
             res.status(404).send({
                 message: 'El usuario no existe'
             });
         }

         //Revisar password
         const pass = await bcrypt.compare(password, usuario.password);
         if(!pass){
            res.status(404).send({
                message: 'El password es incorrecto'
            });
         }

        //Crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        jwt.sign(payload, process.env.KEY_JWT, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.status(200).send({
                token
            });
        });

     } catch (error) {
        console.log(error);
     }
}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).send({
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}