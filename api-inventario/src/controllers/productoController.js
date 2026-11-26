
const db = require('../config/database');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const resultado = await db.query(
            'SELECT * FROM productos ORDER BY id DESC'
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar los productos'
        });
    }
};

// Registrar un producto
exports.crearProducto = async (req, res) => {
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

    try {
        const resultado = await db.query(
            `INSERT INTO productos (nombre, categoria, precio, stock)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [nombre.trim(), categoria.trim(), precio, stock]
        );

        res.status(201).json({
            mensaje: 'Producto registrado correctamente',
            id: resultado.rows[0].id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al registrar el producto'
        });
    }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
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

    try {
        const resultado = await db.query(
            `UPDATE productos
             SET nombre = $1, categoria = $2, precio = $3, stock = $4
             WHERE id = $5`,
            [nombre.trim(), categoria.trim(), precio, stock, Number(id)]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            mensaje: 'ID inválido'
        });
    }

    try {
        const resultado = await db.query(
            'DELETE FROM productos WHERE id = $1',
            [Number(id)]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
};
