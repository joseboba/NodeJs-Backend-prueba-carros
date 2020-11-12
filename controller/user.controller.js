const bcrypt = require('bcryptjs');

const { Op } = require('sequelize');
const { User } = require('../models/user.model');
const { validate } = require('email-validator')
const { generateJWT } = require('../service/jwt');
const { request, response } = require('express');





const saveUser = async(req = request, res = response) => {

    const { username, email, password } = req.body;

    try {

        const find = await User.findOne({ where: { [Op.or]:[{ username }, { email }] } })

        if(find){
           return res.status(401).json({
                ok: false,
                msg: 'No se puede guardar registros repetidos'
            })
        }

        let user = new User(req.body);

        //Encriptar contraseñas
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();

        const jwt = { id: user.id, name: user.name }
        const token = await generateJWT(jwt)

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }

}

const updateUser = async(req = request, res = response) => {

    const id = req.params.id;
    const newUser = { ...req.body };
    const { email = '', username = '' } = newUser;

    try {

        let user;

        if( (email && validate(email)) || newUser.username ){
            user = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } })
            
            if(user){
                return res.status(401).json({
                    ok: false,
                    msg: 'Correo o usuario en uso'
                })
            }
        }

        user = await User.update(newUser, { where: { id } });
        return res.status(201).json({
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }


}

const updatePassword = async(req = request, res = response) => {

    const id = req.params.id;
    const { old, update } = req.body;

    try {

        let user = await User.findByPk( Number(id));

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'No existe registros'
            })
        }

        const validatePassword = bcrypt.compareSync( old, user.password);
        
        if(!validatePassword){
            return res.status(401).json({
                ok: false,
                msg: 'Las contraseña actual no coincide'
            })
        }

        if( update.length < 6){
            return res.status(401).json({
                ok: false,
                msg: 'Debe de tener 6 caracteres o mas'
            })
        }

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(update, salt);

        user = await User.update( { password }, { where: { id } } )

        return res.status(201).json({
            ok: true,
            update: user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }

}

const  authLogin = async(req = request, res = response) => {

    const { username = '',  email = '', password  } = req.body;

    try {

        let usuario = await User.findOne({ where: { [Op.or]: [ { email }, { username } ] } });

        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'No existe en base de datos'
            })
        }

        const validatePassword = bcrypt.compareSync( password, usuario.password );

        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: 'No coinciden las contraseñas'
            })
        }

        //Generate Token
        const token = await generateJWT( usuario );

        res.json({
            ok: true,
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

const deleteUser = async(req = request, res = response) => {

    const id = req.params.id;

    try {

        let user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'No existen registros con este id'
            })
        }

        user = await User.destroy({ where: { id } });
        return res.status(201).json({
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error)
    }

}

const renewToken = async(req = request, res = response) => {

    const { id } = req.user;
    const usuario = await User.findByPk(id)
    const token = await generateJWT( req.user );

    res.status(200).json({
        ok: true,
        usuario,
        token
    })

}

const getUser = async ( req = request, res = response ) => {

    const id = req.params.id;
    const usuario = await User.findByPk(id);
    
    return res.status(200).json({

        ok: true,
        usuario

    })

} 




module.exports = {
    saveUser,
    updateUser,
    updatePassword,
    authLogin,
    deleteUser,
    renewToken,
    getUser
}