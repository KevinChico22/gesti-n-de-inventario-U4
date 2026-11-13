
<template>
  <section class="inventario">
    <div class="encabezado">
      <div>
        <h2>Inventario de productos</h2>
        <p>Consulta y administra los productos registrados.</p>
      </div>
      <span class="contador">
        {{ productos.length }} productos
      </span>
    </div>

    <div v-if="cargando" class="mensaje">
      Cargando productos...
    </div>

    <div v-else-if="error" class="mensaje error">
      {{ error }}
    </div>

    <div v-else-if="productos.length === 0" class="mensaje">
      No hay productos registrados todavía.
    </div>

    <div v-else class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria }}</td>
            <td>${{ Number(producto.precio).toFixed(2) }}</td>
            <td>{{ producto.stock }}</td>
            <td>
              <button
                class="editar"
                @click="$emit('editar', producto)"
              >
                Editar
              </button>

              <button
                class="eliminar"
                @click="$emit('eliminar', producto.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
defineProps({
  productos: {
    type: Array,
    default: () => []
  },
  cargando: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['editar', 'eliminar'])
</script>

<style scoped>
.inventario {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

h2 {
  color: #1e293b;
  margin-bottom: 8px;
}

p {
  color: #64748b;
}

.contador {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 8px 14px;
  border-radius: 20px;
}

.mensaje {
  text-align: center;
  padding: 30px;
  color: #64748b;
}

.error {
  color: #dc2626;
}

.tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
}

th, td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f1f5f9;
  color: #334155;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 3px;
}

.editar {
  background: #2563eb;
}

.eliminar {
  background: #dc2626;
}

button:focus-visible {
  outline: 2px solid #1e293b;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .inventario {
    padding: 15px;
  }

  .encabezado {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
