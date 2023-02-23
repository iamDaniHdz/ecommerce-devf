const express = require('express')
const router = express.Router()
const { getPedidoProducto, setPedidoProducto, updatePedidoProducto, deletePedidoProducto } = require('../controllers/pedidoProductoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPedidoProducto).post(protect, setPedidoProducto)
router.route('/:id').delete(protect, deletePedidoProducto).put(protect, updatePedidoProducto)

module.exports = router
