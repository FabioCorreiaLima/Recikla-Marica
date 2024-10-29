
const express = require('express');
const { createColeta, getColetas, updateColeta, deleteColeta, getAvailableColetas,acceptColeta } = require('../controllers/coletaController');
const {authMiddleware }= require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/coletas', authMiddleware, createColeta);
router.get('/coletas', authMiddleware, getColetas);
router.put('/coletas/:id', authMiddleware, updateColeta);
router.delete('/coletas/:id', authMiddleware, deleteColeta);
router.get('/coletas-disponiveis', authMiddleware, getAvailableColetas);
router.put('/coletas/:id/aceitar', authMiddleware, acceptColeta);


module.exports = router;
