const Resena = require('../models/resenaModel');

exports.getAll = (req, res) => {
    Resena.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.create = (req, res) => {
    const calif = req.body.calificacion;
    if (calif < 1 || calif > 5) return res.status(400).json({ mensaje: 'La calificación debe ser entre 1 y 5.' });
    
    Resena.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Reseña enviada', id: result.insertId });
    });
};

exports.getById = (req, res) => {
    Resena.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    Resena.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Reseña actualizada' });
    });
};

exports.delete = (req, res) => {
    Resena.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Reseña eliminada' });
    });
};

// EXTRA: Promedio de estrellas
exports.getPromedio = (req, res) => {
    Resena.getPromedio(req.params.prestador_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results[0]);
    });
};