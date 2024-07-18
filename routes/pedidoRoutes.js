const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/checkout', pedidoController.crearPedido);

router.get('/mispedidos', pedidoController.obtenerPedidoPorId);

module.exports = router;