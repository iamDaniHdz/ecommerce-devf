const express = require('express')
const router = express.Router()
const { getPedidoProducto, setPedidoProducto, updatePedidoProducto, deletePedidoProducto } = require('../controllers/pedidoProductoController')

// const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(protect, getPedidoProducto).post(protect, setPedidoProducto)
// router.route('/:id').delete(protect, deletePedidoProducto).put(protect, updatePedidoProducto)

router.route('/').get(getPedidoProducto).post(setPedidoProducto)
router.route('/:id').delete(deletePedidoProducto).put(updatePedidoProducto)

module.exports = router
