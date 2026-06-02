const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, usuarioCtrl.getAll);
router.get('/:id', verificarToken, usuarioCtrl.getById);
router.put('/:id', verificarToken, usuarioCtrl.update);
router.delete('/:id', verificarToken, usuarioCtrl.delete);
router.get('/rol/:rol', verificarToken, usuarioCtrl.getByRol);

module.exports = router;