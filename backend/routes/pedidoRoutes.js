const express = require('express')
const router = express.Router()
const { getPedido, setPedido, updatePedido, deletePedido } = require('../controllers/pedidoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPedido).post(protect, setPedido)
router.route('/:id').delete(protect, deletePedido).put(protect, updatePedido)

// router.route('/').get(getPedido).post(setPedido)
// router.route('/:id').delete(deletePedido).put(updatePedido)

module.exports = router
