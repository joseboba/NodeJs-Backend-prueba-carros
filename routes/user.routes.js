
const { check } = require('express-validator');
const { Router } = require('express');
const { Authenticated } = require('../middlewares/authenticated');
const { validarCampos } = require('../middlewares/validar-campos');
const { saveUser,updateUser, updatePassword, authLogin, deleteUser, renewToken, getUser } = require('../controller/user.controller');



//Inicialización
const router = Router();

router.post('/', 
                [
                    check('name', 'No puede dejar datos vacios').isString().notEmpty(),
                    check('email', 'No puede dejar datos vacios').isEmail().notEmpty(),
                    check('password', 'No puede dejar datos vacios').isString().notEmpty().isLength({ min: 6 }),
                    check('username', 'No puede dejar datos vacios').isString().notEmpty(),
                    validarCampos
                ]
            ,saveUser)

router.put('/:id', Authenticated ,updateUser),
router.put('/secret/:id',
                        [ 
                            check('update', 'La nueva contraseña es necesaria').notEmpty().isString().isLength({ min: 6 }), 
                            check('old').notEmpty().isString(),
                            validarCampos,
                            Authenticated  
                        ]
                        ,updatePassword);
router.post('/auth', authLogin);
router.delete('/:id', Authenticated ,deleteUser);
router.get('/renew', Authenticated, renewToken);
router.get('/get/:id', Authenticated, getUser);






module.exports = router;