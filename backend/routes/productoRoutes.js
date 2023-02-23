const express = require('express')
const router = express.Router()
const { getProducto, setProducto, updateProducto, deleteProducto } = require('../controllers/productoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProducto).post(protect, setProducto)
router.route('/:id').delete(protect, deleteProducto).put(protect, updateProducto)

module.exports = router
