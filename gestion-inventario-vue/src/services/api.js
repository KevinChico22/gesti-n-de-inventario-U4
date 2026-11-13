
const API_URL = 'http://localhost:3000/api/productos';

// Obtener todos los productos
export const obtenerProductos = async () => {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error('Error al obtener los productos');
    }

    return await respuesta.json();
};

// Registrar un producto
export const crearProducto = async (producto) => {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });

    if (!respuesta.ok) {
        throw new Error('Error al registrar el producto');
    }

    return await respuesta.json();
};

// Actualizar un producto
export const actualizarProducto = async (id, producto) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });

    if (!respuesta.ok) {
        throw new Error('Error al actualizar el producto');
    }

    return await respuesta.json();
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
    }

    return await respuesta.json();
};
