
<script setup>
import { ref, onMounted } from 'vue';

import Navbar from './components/Navbar.vue';
import Inventario from './components/Inventario.vue';
import FormularioProducto from './components/FormularioProducto.vue';

import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from './services/api.js';

const productos = ref([]);
const cargando = ref(false);
const error = ref('');
const vistaActual = ref('inventario');
const productoEditar = ref(null);

// Cargar productos desde la API
const cargarProductos = async () => {
    cargando.value = true;
    error.value = '';

    try {
        productos.value = await obtenerProductos();
    } catch (e) {
        error.value = 'No se pudieron cargar los productos.';
    } finally {
        cargando.value = false;
    }
};

// Guardar un producto nuevo o editar uno existente
const guardarProducto = async (producto) => {
    try {
        if (productoEditar.value) {
            await actualizarProducto(productoEditar.value.id, producto);
        } else {
            await crearProducto(producto);
        }

        productoEditar.value = null;
        vistaActual.value = 'inventario';

        await cargarProductos();
    } catch (e) {
        alert('No se pudo guardar el producto.');
    }
};

// Preparar producto para edición
const editarProducto = (producto) => {
    productoEditar.value = { ...producto };
    vistaActual.value = 'formulario';
};

// Eliminar producto
const borrarProducto = async (id) => {
    if (!confirm('¿Deseas eliminar este producto?')) return;

    try {
        await eliminarProducto(id);
        await cargarProductos();
    } catch (e) {
        alert('No se pudo eliminar el producto.');
    }
};

// Cancelar formulario
const cancelarFormulario = () => {
    productoEditar.value = null;
    vistaActual.value = 'inventario';
};

// Cargar productos al iniciar
onMounted(cargarProductos);
</script>

<template>
    <div class="app">
        <Navbar
            :vista-actual="vistaActual"
            @cambiar-vista="vistaActual = $event"
        />

        <main class="contenedor">
            <Inventario
                v-if="vistaActual === 'inventario'"
                :productos="productos"
                :cargando="cargando"
                :error="error"
                @editar="editarProducto"
                @eliminar="borrarProducto"
            />

            <FormularioProducto
                v-else
                :producto-editar="productoEditar"
                @guardar="guardarProducto"
                @cancelar="cancelarFormulario"
            />
        </main>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6f9;
}

.contenedor {
    max-width: 1100px;
    margin: 30px auto;
    padding: 20px;
}
</style>
