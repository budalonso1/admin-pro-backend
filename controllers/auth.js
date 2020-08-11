const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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

module.exports = {
    login
};