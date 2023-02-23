const asyncHandler = require('express-async-handler')

const Pedido = require('../models/pedidoModel')

const getPedido = asyncHandler(async (req, res) => {
    const { permisos } = req.user
   
    // Acceder a GET si el usuario tiene permisos
    if (permisos == true) {
        const pedido = await Pedido.find()
        res.status(200).json(pedido)
    } else {
        const pedido = await Pedido.find({id_cliente:req.user.id})
        res.status(200).json(pedido)
    }
})

const setPedido = asyncHandler(async (req, res) => {
    const { fecha, estaPagado, estaEnviado, } = req.body

    if (!fecha || !estaPagado || !estaEnviado) {
        res.status(400)
        throw new Error(`Por favor complete los detalles `)
    }

    // Acceder a POST si el usuario tiene permisos
    const { esCliente} = req.user
    if (esCliente == false) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    const pedido = await Pedido.create({
        id_cliente: req.user.id,
        fecha,
        estaPagado,
        estaEnviado,
    })

    res.status(201).json(pedido)
})

const updatePedido = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(400)
        throw new Error('Pedido no encontrado')
    }

    // Acceder a PUT si el usuario tiene permisos
    const { permisos } = req.user
    if (permisos == false) {
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

    // Acceder a DELETE si el usuario tiene permisos
    const { permisos } = req.user
    if (permisos == false) {
        res.status(401)
        throw new Error('Acceso no Autorizado')
    }

    await pedido.remove()
    res.status(200).json('Pedido: ' + req.params.id + ' eliminado')
})

module.exports = {
    getPedido,
    setPedido,
    updatePedido,
    deletePedido
}