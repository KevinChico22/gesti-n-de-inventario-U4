
<template>
  <section class="formulario">
    <h2>{{ productoEditar ? 'Editar producto' : 'Registrar nuevo producto' }}</h2>
    <p>Completa los datos del producto.</p>

    <form @submit.prevent="guardarProducto">
      <div class="campo">
        <label for="nombre">Nombre del producto</label>
        <input
          id="nombre"
          v-model="formulario.nombre"
          type="text"
          placeholder="Ej. Computadora"
          required
        />
      </div>

      <div class="campo">
        <label for="categoria">Categoría</label>
        <input
          id="categoria"
          v-model="formulario.categoria"
          type="text"
          placeholder="Ej. Electrónica"
          required
        />
      </div>

      <div class="campo">
        <label for="precio">Precio ($)</label>
        <input
          id="precio"
          v-model.number="formulario.precio"
          type="number"
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div class="campo">
        <label for="stock">Cantidad disponible</label>
        <input
          id="stock"
          v-model.number="formulario.stock"
          type="number"
          min="0"
          step="1"
          required
        />
      </div>

      <div class="botones">
        <button type="submit" class="guardar">
          {{ productoEditar ? 'Actualizar producto' : 'Guardar producto' }}
        </button>

        <button
          type="button"
          class="cancelar"
          @click="$emit('cancelar')"
        >
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  productoEditar: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['guardar', 'cancelar'])

const formulario = reactive({
  nombre: '',
  categoria: '',
  precio: 0,
  stock: 0
})

watch(
  () => props.productoEditar,
  (producto) => {
    if (producto) {
      Object.assign(formulario, producto)
    } else {
      Object.assign(formulario, {
        nombre: '',
        categoria: '',
        precio: 0,
        stock: 0
      })
    }
  },
  { immediate: true }
)

function guardarProducto() {
  emit('guardar', { ...formulario })

  Object.assign(formulario, {
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0
  })
}
</script>

<style scoped>
.formulario {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 650px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

h2 {
  color: #1e293b;
  margin-bottom: 8px;
}

p {
  color: #64748b;
  margin-bottom: 25px;
}

.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
}

input {
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 15px;
}

input:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
}

.botones {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 25px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}

.guardar {
  background: #2563eb;
}

.cancelar {
  background: #64748b;
}

button:focus-visible {
  outline: 2px solid #1e293b;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .formulario {
    padding: 18px;
  }

  .botones {
    flex-direction: column;
  }
}
</style>
