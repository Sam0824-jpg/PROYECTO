const Servicio = require('../models/servicioModel');

exports.getAll = (req, res) => {
    Servicio.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.create = (req, res) => {
    if (req.body.precio_base < 0) return res.status(400).json({ mensaje: 'El precio no puede ser negativo.' });
    
    Servicio.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Servicio creado', id: result.insertId });
    });
};

exports.getById = (req, res) => {
    Servicio.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    Servicio.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Servicio actualizado' });
    });
};

exports.delete = (req, res) => {
    Servicio.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Servicio eliminado' });
    });
};

// EXTRA: Servicios por prestador
exports.getByPrestador = (req, res) => {
    Servicio.getByPrestador(req.params.prestador_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};