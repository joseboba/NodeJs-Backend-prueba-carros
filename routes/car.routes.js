const { check } = require('express-validator');
const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { Authenticated } = require('../middlewares/authenticated');
const { saveCar, deleteCar, updateCar, findAllCar, findCar } = require('../controller/car.controller');

const router = Router();
router.use(Authenticated)

router.post('/', [
    check('marca', 'La marca es obligatoria').isString().notEmpty(),
    check('modelo', 'El modelo es obligatoria').isString().notEmpty(),
    check('year', 'El año es obligatoria').isString().notEmpty(),
    check('placa', 'La placa es obligatoria').isString().notEmpty(),
    check('estado', 'El estado es obligatoria').isString().notEmpty(),
    validarCampos
], saveCar)
router.get('/',findAllCar);
router.get('/search/:placa',findCar);
router.put('/:id', updateCar)
router.delete('/:id' ,deleteCar);


module.exports = router