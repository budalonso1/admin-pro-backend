/*
    ruta: '/api/hospitales'
*/
var express = require('express');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { crearHospital, getHospitales, borrarHospital, actualizarHospital } = require('../controllers/hospitales')
const { validarJWT } = require('../middlewares/validar-jwt')


router.get('/', getHospitales);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);
router.delete('/:id', [validarJWT], borrarHospital);

module.exports = router;