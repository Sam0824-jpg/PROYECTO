const express = require('express');
const router = express.Router();
const resenaCtrl = require('../controllers/resenaController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, resenaCtrl.getAll);
router.post('/', verificarToken, resenaCtrl.create);
router.get('/:id', verificarToken, resenaCtrl.getById);
router.put('/:id', verificarToken, resenaCtrl.update);
router.delete('/:id', verificarToken, resenaCtrl.delete);
router.get('/promedio/:prestador_id', verificarToken, resenaCtrl.getPromedio);

module.exports = router;