const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea el nombre del usuario']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea el email del usuario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea un password']
    },
    esCliente:{
        type: Boolean,
        required: [true, 'Por favor teclea true o false']
    },
    permisos:{
        type: Boolean,
        required: [true, 'Por favor teclea true o false']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)