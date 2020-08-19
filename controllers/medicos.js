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
const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no fue encontrado'
            });
        }
        const medicoEditar = {
            ...req.body,
            usuario: uid
        };

        const medicoEditado = await Medico.findByIdAndUpdate(id, medicoEditar, { new: true });
        res.json({
            ok: true,
            medicoEditado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Debes contactar al administrador'
        });
    }

};
const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no fue encontrado'
            });
        }

        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Medico fue eliminado con exito'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Debes contactar al administrador'
        });
    }

};

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico

}