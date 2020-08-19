var express = require('express');
const { Router } = require('express');
const router = Router();
const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:busqueda', [validarJWT], getTodo);
router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentoColeccion);

module.exports = router;