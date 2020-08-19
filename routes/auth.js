var express = require('express');
const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/', [
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);
router.post('/google', [
    check('token', 'El token de google debe ser obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn);
router.get('/renew', [validarJWT], renewToken);

module.exports = router;