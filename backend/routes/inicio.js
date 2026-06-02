const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, (req, res) => {
    // Dato dinámico: Contar cuántos prestadores hay en la app
    db.query('SELECT COUNT(*) AS total FROM prestadores', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(200).json({
            sistema: "FyNe - Plataforma de Oficios Locales",
            fecha_servidor: new Date().toISOString(),
            modulos_activos: ['Usuarios', 'Prestadores', 'Categorías', 'Servicios', 'Reseñas'],
            estadisticas: {
                total_prestadores_registrados: results[0].total
            }
        });
    });
});
module.exports = router;