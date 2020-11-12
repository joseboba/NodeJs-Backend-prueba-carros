const jwt = require('jsonwebtoken');

const generateJWT = ( user ) => {

    return new Promise((resolve, reject) => {

        const { id, name } = user;
        const payload  = { id, name }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token)
        })

    })
}

module.exports = {
    generateJWT
}