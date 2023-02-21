const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fecha: {
        type: Date,
        required: [true, 'Por favor teclea la fecha']
    },
    estaPagado: {
        type: Boolean,
        required: [true, 'Por favor teclea si se pagó el producto']
    },
    estaEnviado: {
        type: Boolean,
        required: [true, 'Por favor teclea si se envió el producto']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Pedido', pedidoSchema)