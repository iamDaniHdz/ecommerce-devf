const asyncHandler = require('express-async-handler')

const Pedido = require('../models/pedidoModel')

const getPedido = asyncHandler(async (req, res) => {
    // const producto = await Producto.find({ user: req.user.id })
    const pedido = await Pedido.find()

    res.status(200).json(pedido)
})

const setPedido = asyncHandler(async (req, res) => {

    const { fecha, estaEnviado } = req.body

    if (!fecha || !estaEnviado ) {
        res.status(400)
        throw new Error('Por favor complete los detalles del pedido')
    }

    const pedido = await Pedido.create({
        user: req.user.id,
        fecha: req.body.fecha,
        estaPagado: req.body.estaPagado,
        estaEnviado: req.body.estaEnviado,
    })

    res.status(201).json(pedido)
})

const updatePedido = asyncHandler(async (req, res) => {

    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(400)
        throw new Error('Pedido no encontrado')
    }

    // verificamos que el user de la tarea sea igual al user del token
    if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedPedido)
})

const deletePedido = asyncHandler(async (req, res) => {

    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(400)
        throw new Error('Pedido no encontrado')
    }

    //verificamos que el user de la tarea sea igual al user del token
    if (pedido.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    await pedido.remove()

    res.status(200).json('Pedido: ' + req.params.id + ' eliminado')
})

module.exports = {
    getPedido,
    setPedido,
    updatePedido,
    deletePedido
}