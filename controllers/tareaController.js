const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(200).send({
            errores: errores.array()
        });
    }

     //Comprobar si existe el proyectoId
     const { proyectoId } = req.body;

    try {
       
        const proyecto = await Proyecto.findById(proyectoId);
        if(!proyecto){
            return res.status(404).send({
                message: 'El proyecto no existe'
            });
        }

         //Verificar creador 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).send({
                message: 'No autorizado'
            });
        }

        //Crear tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        return res.status(200).send({
            message: 'Tarea guardada con exito',
            tarea
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

exports.obtenerTareas = async (req, res) => {

    //Comprobar si existe el proyectoId
    const { proyectoId } = req.query;

    try {

        const proyecto = await Proyecto.findById(proyectoId);
        if(!proyecto){
            return res.status(404).send({
                message: 'El proyecto no existe'
            });
        }

         //Verificar creador 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).send({
                message: 'No autorizado'
            });
        }

        //Obtener las tareas
        const tareas = await Tarea.find({ proyectoId }).sort({ creado: -1 });
        return res.status(200).send({
            tareas
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

exports.actualizarTarea = async (req, res) => {

    //Comprobar si existe el proyectoId
    const { proyectoId, nombre, estado } = req.body;

     try {

        var tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).send({
                message: 'La tarea no existe'
            });
        }

        const proyecto = await Proyecto.findById(proyectoId);

         //Verificar creador 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).send({
                message: 'No autorizado'
            });
        }

        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        return res.status(200).send({
            tarea
        });
        
     } catch (error) {
         console.log(error);
         return res.status(500).send({
            message: 'Ocurrio un error'
        });
     }
}

exports.eliminarTarea = async (req, res) => {
     //Comprobar si existe el proyectoId
     const { proyectoId } = req.query;

     try {

        var tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).send({
                message: 'La tarea no existe'
            });
        }

        const proyecto = await Proyecto.findById(proyectoId);

         //Verificar creador 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).send({
                message: 'No autorizado'
            });
        }

        //Eliminar tarea
        await Tarea.findOneAndRemove({ _id: req.params.id });
        return res.status(200).send({
            message: 'Tarea eliminada con exito'
        });
        
     } catch (error) {
         console.log(error);
         return res.status(500).send({
            message: 'Ocurrio un error'
        });
     }
}