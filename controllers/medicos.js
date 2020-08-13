const { response } = require('express');
const Medico = require('../models/medico');

const getMedico = async(req, res = response) => {

    try {
        const medicos = await Medico.find()
            .populate('usuario', 'nombre email')
            .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Debes contactar al administrador'
        });
    }
};
const crearMedico = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {

        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Debes contactar al administrador'
        });
    }
};
const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};
const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
};

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico

}