var express = require('express');
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUploads, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());



router.put('/:tipo/:id', [validarJWT], fileUploads);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;