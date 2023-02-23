const asyncHandler = require('express-async-handler')

const PedidoProducto = require('../models/pedidoProductoModel')

const getPedidoProducto = asyncHandler(async (req, res) => {
    // const pedidoProducto = await PedidoProducto.find({ user: req.user.id })
    const pedidoProducto = await PedidoProducto.find()

    res.status(200).json(pedidoProducto)
})

const setPedidoProducto = asyncHandler(async (req, res) => {

    const { id_pedido, id_producto, cantidad, precio } = req.body

    if ( !id_pedido || !id_producto || !cantidad || !precio ) {
        res.status(400)
        throw new Error('Por favor complete los detalles del producto')
    }

    const pedidoProducto = await PedidoProducto.create({
        // id_pedido: req.pedido.id,
        // id_producto: req.producto.id,
        // cantidad: req.body.cantidad,
        // precio: req.body.precio,
        // importe: req.body.importe
        id_pedido,
        id_producto,
        cantidad,
        precio,
        importe: cantidad * precio
    })

    res.status(201).json(pedidoProducto)
})

const updatePedidoProducto = asyncHandler(async (req, res) => {

    const pedidoProducto = await PedidoProducto.findById(req.params.id)

    if (!pedidoProducto) {
        res.status(400)
        throw new Error('PedidoProducto no encontrado')
    }

    //verificamos que el user de la tarea sea igual al user del token
    // if (tarea.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('Acceso no Autorizado')
    // }

    const updatedPedidoProducto = await PedidoProducto.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedPedidoProducto)
})

const deletePedidoProducto = asyncHandler(async (req, res) => {

    const pedidoProducto = await PedidoProducto.findById(req.params.id)

    if (!pedidoProducto) {
        res.status(400)
        throw new Error('pedidoProducto no encontrado')
    }

    //verificamos que el user de la tarea sea igual al user del token
    // if (tarea.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('Acceso no Autorizado')
    // }

    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    await pedidoProducto.remove()

    res.status(200).json('PedidoProducto: ' + req.params.id + ' eliminado')
})

module.exports = {
    getPedidoProducto,
    setPedidoProducto,
    updatePedidoProducto,
    deletePedidoProducto
}