const Prestador = require('../models/prestadorModel');

// Obtener todos
exports.getAll = (req, res) => {
    Prestador.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Crear (Con validaciones de negocio)
exports.create = (req, res) => {
    const { usuario_id, categoria_id, telefono, zona_cobertura } = req.body;
    
    // Validación de negocio: El teléfono debe tener 10 dígitos para FyNe
    if (!telefono || telefono.length !== 10) {
        return res.status(400).json({ mensaje: 'El teléfono debe tener exactamente 10 dígitos.' });
    }

    Prestador.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Prestador creado', id: result.insertId });
    });
};

// Obtener uno por ID
exports.getById = (req, res) => {
    Prestador.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Prestador no encontrado' });
        res.status(200).json(results[0]);
    });
};

// Actualizar
exports.update = (req, res) => {
    Prestador.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Prestador actualizado' });
    });
};

// Eliminar
exports.delete = (req, res) => {
    Prestador.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ mensaje: 'Prestador eliminado' });
    });
};

// ENDPOINT EXTRA: Filtrar por Zona
exports.getByZona = (req, res) => {
    const zona = req.params.zona;
    Prestador.getByZona(zona, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'No hay oficios en esta zona' });
        res.status(200).json(results);
    });
};