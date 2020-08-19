const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require("../models/usuario");
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // verifica email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no Encotrado'
            });
        }
        // Verificar contraseña
        const validaPassword = bcrypt.compareSync(password, usuarioDB.password);


        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contaseña no es valida'
            });
        }

        // Generar toquen
        const token = await generarJWT(usuarioDB._id);


        res.json({
            ok: true,
            token: token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
};
const googleSingIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en base de datos
        await usuario.save();

        //generar jwt
        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'token no es correcto'
        });
    }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token
    });
};

module.exports = {
    login,
    renewToken,
    googleSingIn
};