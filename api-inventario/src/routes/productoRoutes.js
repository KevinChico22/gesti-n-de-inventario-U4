
const express = require('express');
const router = express.Router();

// Importar las funciones del controlador
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Registrar un producto
router.post('/', productoController.crearProducto);

// Actualizar un producto
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
