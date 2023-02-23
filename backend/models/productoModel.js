const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea el nombre del producto']
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor teclea la descripción del producto']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor teclea el precio del producto']
    },
    categoria: {
        type: String,
        required: [true, 'Por favor teclea la categoría del producto']
    },
    sku: {
        type: String,
        required: [true, 'Por favor teclea el SKU del producto'],
        unique: true
    },
    marca: {
        type: String,
        required: [true, 'Por favor teclea la marca del producto']
    },
    modelo: {
        type: String,
        required: [true, 'Por favor teclea el modelo del producto']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Producto', productoSchema)