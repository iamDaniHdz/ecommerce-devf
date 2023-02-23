const asyncHandler = require('express-async-handler')

const Producto = require('../models/productoModel')

const getProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.find()
    res.status(200).json(producto)
})

const setProducto = asyncHandler(async (req, res) => {
    const { nombre, descripcion, precio, categoria, sku, marca, modelo} = req.body

    if (!nombre || !descripcion || !precio || !categoria || !sku || !marca || !modelo) {
        res.status(400)
        throw new Error('Por favor complete los detalles del producto')
    }

    // Acceder a POST si el usuario tiene permisos
    const { permisos } = req.user
    if (permisos == false) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    const producto = await Producto.create({
        nombre,
        descripcion,
        precio,
        categoria,
        sku,
        marca,
        modelo,
    })

    res.status(201).json(producto)
})

const updateProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    // Acceder a PUT si el usuario tiene permisos
    const { permisos } = req.user
    if (permisos == false) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedProducto)
})

const deleteProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    // Acceder a DELETE si el usuario tiene permisos
    const { permisos } = req.user
    if (permisos == false) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    await producto.remove()
    res.status(200).json('Producto: ' + req.params.id + ' eliminado')
})

module.exports = {
    getProducto,
    setProducto,
    updateProducto,
    deleteProducto
}