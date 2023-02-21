const asyncHandler = require('express-async-handler')

const Producto = require('../models/productoModel')

const getProducto = asyncHandler(async (req, res) => {
    // const producto = await Producto.find({ user: req.user.id })
    const producto = await Producto.find()

    res.status(200).json(producto)
})

const setProducto = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error('Por favor teclea una descripción del producto')
    }

    const producto = await Producto.create({
        texto: req.body.texto,
        // user: req.user.id
    })

    res.status(201).json(producto)
})

const updateProducto = asyncHandler(async (req, res) => {

    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    //verificamos que el user de la tarea sea igual al user del token
    // if (tarea.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('Acceso no Autorizado')
    // }

    const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedProducto)
})

const deleteProducto = asyncHandler(async (req, res) => {

    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(400)
        throw new Error('Producto no encontrado')
    }

    //verificamos que el user de la tarea sea igual al user del token
    // if (tarea.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('Acceso no Autorizado')
    // }

    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    await producto.remove()

    res.status(200).json(req.params.id)
})

module.exports = {
    getProducto,
    setProducto,
    updateProducto,
    deleteProducto
}