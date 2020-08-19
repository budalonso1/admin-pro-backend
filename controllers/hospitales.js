const { response } = require('express');
const Hospital = require('../models/hospital');



const getHospitales = async(req, res = response) => {

    try {
        const hospitales = await Hospital.find().populate('usuario', 'nombre email')
        res.json({
            ok: true,
            hospitales
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se debe comunicar con el administrador'
        });
    }
};
const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hablar con el administrador'
        });
    }
};
const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no se encontro'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });


        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no se encontro'
            });
        }

        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Hospital fue eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    getHospitales,
    actualizarHospital,
    borrarHospital,
    crearHospital
};