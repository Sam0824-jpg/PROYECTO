const Categoria = require('../models/categoriaModel');

exports.getAll = (req, res) => {
    Categoria.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.create = (req, res) => {
    if (!req.body.nombre) return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
    
    Categoria.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Categoría creada', id: result.insertId });
    });
};

exports.getById = (req, res) => {
    Categoria.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    Categoria.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Categoría actualizada' });
    });
};

exports.delete = (req, res) => {
    Categoria.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Categoría eliminada' });
    });
};

// EXTRA: Buscar por nombre
exports.buscar = (req, res) => {
    Categoria.buscar(req.params.nombre, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};