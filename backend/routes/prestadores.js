const express = require('express');
const router = express.Router();
const prestadorCtrl = require('../controllers/prestadorController');
const verificarToken = require('../middlewares/authMiddleware');

// Rutas protegidas con el middleware
router.get('/', verificarToken, prestadorCtrl.getAll);
router.post('/', verificarToken, prestadorCtrl.create);
router.get('/:id', verificarToken, prestadorCtrl.getById);
router.put('/:id', verificarToken, prestadorCtrl.update);
router.delete('/:id', verificarToken, prestadorCtrl.delete);

// RUTA EXTRA DEL NEGOCIO
router.get('/zona/:zona', verificarToken, prestadorCtrl.getByZona);

module.exports = router;