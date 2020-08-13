/*
    ruta: '/api/hospitales'
*/
var express = require('express');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedico, actualizarMedico, crearMedico, borrarMedico } = require('../controllers/medicos');

router.get('/', getMedico);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', [], actualizarMedico);
router.delete('/:id', borrarMedico);

module.exports = router;