
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar base de datos
const db = require('./config/database');

// Importar rutas de productos
const productoRoutes = require('./routes/productoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Gestión de Inventario funcionando correctamente'
    });
});

// Comprobar conexión con la base de datos
app.get('/api/estado', (req, res) => {
    db.get('SELECT 1 AS conexion', (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al conectar con la base de datos'
            });
        }

        res.json({
            mensaje: 'API y base de datos funcionando correctamente',
            conexion: resultado.conexion
        });
    });
});

// Registrar las rutas de productos
app.use('/api/productos', productoRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
