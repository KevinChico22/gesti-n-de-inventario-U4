
const db = require('../config/database');

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
    db.all('SELECT * FROM productos ORDER BY id DESC', [], (error, productos) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los productos'
            });
        }

        res.json(productos);
    });
};

// Registrar un producto
exports.crearProducto = (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;

    if (
        typeof nombre !== 'string' || !nombre.trim() ||
        typeof categoria !== 'string' || !categoria.trim() ||
        !Number.isFinite(precio) || precio <= 0 ||
        !Number.isInteger(stock) || stock < 0
    ) {
        return res.status(400).json({
            mensaje: 'Datos del producto inválidos'
        });
    }

    const sql = `
        INSERT INTO productos (nombre, categoria, precio, stock)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [
        nombre.trim(),
        categoria.trim(),
        precio,
        stock
    ], function(error) {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al registrar el producto'
            });
        }

        res.status(201).json({
            mensaje: 'Producto registrado correctamente',
            id: this.lastID
        });
    });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;
    const { id } = req.params;

    if (
        !/^[1-9]\d*$/.test(id) ||
        typeof nombre !== 'string' || !nombre.trim() ||
        typeof categoria !== 'string' || !categoria.trim() ||
        !Number.isFinite(precio) || precio <= 0 ||
        !Number.isInteger(stock) || stock < 0
    ) {
        return res.status(400).json({
            mensaje: 'Datos del producto inválidos'
        });
    }

    const sql = `
        UPDATE productos
        SET nombre = ?, categoria = ?, precio = ?, stock = ?
        WHERE id = ?
    `;

    db.run(sql, [
        nombre.trim(),
        categoria.trim(),
        precio,
        stock,
        Number(id)
    ], function(error) {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el producto'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente'
        });
    });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            mensaje: 'ID inválido'
        });
    }

    db.run(
        'DELETE FROM productos WHERE id = ?',
        [Number(id)],
        function(error) {
            if (error) {
                return res.status(500).json({
                    mensaje: 'Error al eliminar el producto'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensaje: 'Producto no encontrado'
                });
            }

            res.json({
                mensaje: 'Producto eliminado correctamente'
            });
        }
    );
};
