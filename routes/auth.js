var express = require('express');
const { Router } = require('express');
const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.post('/', [
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);

module.exports = router;