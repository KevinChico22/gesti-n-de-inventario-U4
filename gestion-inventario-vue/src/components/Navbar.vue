
<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="brand">
        <div class="brand-icon">📦</div>
        <div>
          <h1>InventarioPro</h1>
          <p>Sistema de gestión de productos</p>
        </div>
      </div>

      <nav aria-label="Navegación principal">
        <button
          :class="{ active: vistaActual === 'inventario' }"
          @click="$emit('cambiar-vista', 'inventario')"
        >
          📋 Inventario
        </button>

        <button
          :class="{ active: vistaActual === 'nuevo' }"
          @click="$emit('cambiar-vista', 'nuevo')"
        >
          ➕ Registrar producto
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineProps({
  vistaActual: {
    type: String,
    required: true
  }
})

defineEmits(['cambiar-vista'])
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #172554, #1e40af);
  color: white;
  padding: 20px 30px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.15);
  border-radius: 14px;
  margin-bottom: 30px;
}

.navbar-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  background: rgba(255,255,255,0.15);
  padding: 12px;
  border-radius: 12px;
  font-size: 28px;
}

.logo {
  font-size: 30px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.brand p {
  color: #ffffff;
  opacity: 0.95;
  margin: 4px 0 0;
  font-size: 13px;
}

nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

nav button {
  background: transparent;
  color: white;
  padding: 12px 17px;
  border-radius: 9px;
  font-size: 14px;
}

nav button:hover,
nav button.active {
  background: white;
  color: #1e40af;
}

nav button:focus-visible {
  outline: 2px solid white;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .navbar {
    padding: 18px;
  }

  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    width: 100%;
  }

  nav button {
    flex: 1;
  }
}
</style>

