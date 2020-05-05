const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(200).send({
            errores: errores.array()
        })
    }

    const { email, password } = req.body;

    try {
        //Revisar que el usuario registrado sea unico

        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).send({
                message: 'El usuario ya existe'
            });
        }

        //Crear usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        //Guardar usuario
        await usuario.save();

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
                message: 'Usuario guardado con exito',
                token
            });
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'Ocurrio un error'
        });
    }
}