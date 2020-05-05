
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).send({
            errores: errores.array()
        });
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador
        proyecto.creador = req.usuario.id

        //Guardar proyecto
        proyecto.save();
        res.status(200).send({
            proyecto
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id}).sort({ fecha: -1});
        res.status(200).send({
            proyectos
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

exports.actualizarProyecto = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).send({
            errores: errores.array()
        });
    }
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //Comprobar id
        const proyectoId = req.params.id;

        //Buscar proyecto
        let proyecto = await Proyecto.findById(proyectoId);
        if(Object.keys(proyecto).length === 0){
            return res.status(500).send({
                message: 'El proyecto no existe'
            });
        }

        //Verificar creador 
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).send({
                message: 'No autorizado'
            });
        }

        //Actualizar proyecto
        proyecto = await Proyecto.findByIdAndUpdate({ _id: proyectoId}, { $set: nuevoProyecto }, { new: true });

        return res.status(200).send({
            message: 'Proyecto actualizado con exito',
            proyecto
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

exports.eliminarProyecto = async (req, res) => {
    
    try {
         //Comprobar id
         const proyectoId = req.params.id;

         //Buscar proyecto
         let proyecto = await Proyecto.findById(proyectoId);
         if(Object.keys(proyecto).length === 0){
             return res.status(400).send({
                 message: 'El proyecto no existe'
             });
         }
 
         //Verificar creador 
         if(proyecto.creador.toString() !== req.usuario.id){
             return res.status(401).send({
                 message: 'No autorizado'
             });
         }

         //Eliminar proyecto 
         await Proyecto.findOneAndRemove({ _id: proyectoId });
         return res.status(200).send({
            message: 'Proyecto eliminado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'Ocurrio un error'
        });
    }
}