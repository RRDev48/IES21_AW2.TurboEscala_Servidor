const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('./routes/productosRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const authRoutes = require('./routes/authRoutes');

// Configuro CORS para que acepte peticiones del dominio de React
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRoutes);
app.use('/api/productos/item/', productosRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/auth', authRoutes);

// Ruta específica para employeeview
app.use('/employeeview', productosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
