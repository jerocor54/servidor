const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //Leer token del header
    const token = req.header('Authorization');

    //Revisar si no hay token
    if(!token){
        return res.status(401).send({
            message: 'Error de autenticación'
        });
    }

    //Validar token
    try {
        const cifrado = jwt.verify(token, process.env.KEY_JWT);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Error de autenticación'
        });
    }
}