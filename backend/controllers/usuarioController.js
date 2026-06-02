const Usuario = require('../models/usuarioModel');

exports.getAll = (req, res) => {
    Usuario.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.getById = (req, res) => {
    Usuario.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    // Validación: No permitir cambiar el ID
    if (req.body.id) return res.status(400).json({ mensaje: 'No puedes modificar el ID del usuario.' });
    
    Usuario.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
    });
};

exports.delete = (req, res) => {
    Usuario.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Usuario eliminado' });
    });
};

// EXTRA: Filtrar por rol
exports.getByRol = (req, res) => {
    Usuario.getByRol(req.params.rol, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};