const mongoose = require('mongoose')

const pedidoProductoSchema = mongoose.Schema({
    id_pedido: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pedido'
    },
    id_producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor teclea la cantidad']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor teclea el precio']
    },
    importe: {
        type: Number,
        // required: [true, 'Por favor teclea el total']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('PedidoProducto', pedidoProductoSchema)