const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/categoriaController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, catCtrl.getAll);
router.post('/', verificarToken, catCtrl.create);
router.get('/:id', verificarToken, catCtrl.getById);
router.put('/:id', verificarToken, catCtrl.update);
router.delete('/:id', verificarToken, catCtrl.delete);
router.get('/buscar/:nombre', verificarToken, catCtrl.buscar);

module.exports = router;