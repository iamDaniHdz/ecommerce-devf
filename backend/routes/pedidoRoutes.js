const express = require('express')
const router = express.Router()
const { getPedido, setPedido, updatePedido, deletePedido } = require('../controllers/pedidoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPedido).post(protect, setPedido)
router.route('/:id').delete(protect, deletePedido).put(protect, updatePedido)

module.exports = router
