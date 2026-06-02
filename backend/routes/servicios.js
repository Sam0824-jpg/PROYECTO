const express = require('express');
const router = express.Router();
const servCtrl = require('../controllers/servicioController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, servCtrl.getAll);
router.post('/', verificarToken, servCtrl.create);
router.get('/:id', verificarToken, servCtrl.getById);
router.put('/:id', verificarToken, servCtrl.update);
router.delete('/:id', verificarToken, servCtrl.delete);
router.get('/prestador/:prestador_id', verificarToken, servCtrl.getByPrestador);

module.exports = router;