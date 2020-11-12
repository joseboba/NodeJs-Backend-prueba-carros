const { request, response } = require('express');
const jwt = require("jsonwebtoken");

const Authenticated = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const user = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    Authenticated
}