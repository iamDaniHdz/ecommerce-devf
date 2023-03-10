const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/productos', require('./routes/productoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/pedido', require('./routes/pedidoRoutes'))
app.use('/api/pedidoProducto', require('./routes/pedidoProductoRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))