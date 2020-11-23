const { Car } = require('../models/car.model');
const { User } = require('../models/user.model');
const { request, response } = require('express');
const { Op } = require('sequelize');



const saveCar = async(req = request, res = response) => {

    const { placa } = req.body;
    const { id } = req.user;

    try {

        const unique = await Car.findOne({ where: { placa } });
        const user = await User.findByPk(id);

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'No puede guardar un auto sin un usuario activo'
            })
        }

        if (unique) {
            return res.status(401).json({
                ok: false,
                msg: 'No se puede guardar placas repetidas'
            })
        }

        let car = new Car(req.body);
        car.UserId = id;
        await car.save();

        return res.status(201).json({
            ok: true,
            car
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        })

    }
}

const updateCar = async(req = request, res = response) => {

    const id  = req.params.id;

    try {
        
        const unique = await Car.findByPk(id);
        if(req.body.placa){

            const uniqueV2 = await Car.findOne({ where: { placa: req.body.placa } })
            console.log(uniqueV2.id);
            console.log(id)
            if(uniqueV2.id !== Number(id) ){
                return res.status(401).json({
                    ok: false,
                    msg: 'No puede repetir el numero de placa'
                })
            }
        }

        if(!unique){
            return res.status(500).json({
                ok: false,
                msg: 'No existe el registro'
            })
        }

        
        const updateCar = await Car.update({ ...req.body }, { where: { id } })
        
        if(updateCar[0] === 1){

            const find = await Car.findByPk(id)
            return res.status(201).json({
                ok: true,
                msg: 'Se ha actualizado con exito',
                update: find
            })

        }else if(updateCar[0] !== 1){
            return res.status(500).json({
                ok: false,
                msg: 'Error'
            })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

const deleteCar = async(req = request, res = response) => {

    const id = req.params.id;

    try {

        const find = await Car.findByPk(id);

        if (!find) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el registro'
            })
        }

        await Car.destroy({ where: { id }});

        return res.status(200).json({
            ok: true,
            obj: find,
            msg: 'Eliminado con exito'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

const findAllCar = async( req = request, res = response ) => {

    const { id } = req.user;

    try {

        const find = await Car.findAll({ where: { UserId: id } });
        
        if(!find){
            return res.status(500).json({
                ok: false,
                msg: 'No hay registros'
            })
        }

        return res.status(201).json({
            ok: true,
            registros: find
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }

}


const findCar = async( req = request, res = response ) => {

    const  placa  = req.params.placa;

    try {

        const find = await Car.findAll({ where: { placa:{[Op.like]: `%${placa}%` }} })

        if(!find){
            return res.status(500).json({
                ok: false,
                msg: 'No hay registros existentes'
            })
        }
        
        return res.json({
            ok: true,
            registros: find
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }



}





module.exports = {
    saveCar,
    deleteCar,
    updateCar,
    findAllCar,
    findCar
}