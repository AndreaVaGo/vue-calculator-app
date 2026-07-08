<script setup>
import { ref, onMounted } from 'vue'
import { useWeather } from '@/composables/useWeather'

const { cities, nationalForecast, isLoading, error, fetchAsturias, fetchNational } = useWeather()

// Controla qué vista está seleccionada: 'asturias' o 'national'
const selectedView = ref('asturias')

// Se ejecuta cada vez que el usuario cambia el selector
function handleViewChange() {
  if (selectedView.value === 'asturias') {
    fetchAsturias()
  } else {
    fetchNational()
  }
}

// Al montar el componente, cargamos Asturias por defecto
onMounted(() => {
  fetchAsturias()
})
</script>

<template>
  <div class="weather-widget">
    <h3>El Tiempo</h3>

    <select v-model="selectedView" @change="handleViewChange">
      <option value="asturias">Asturias</option>
      <option value="national">Nacional</option>
    </select>

    <p v-if="isLoading">Cargando el tiempo...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="selectedView === 'national'">
      <p>{{ nationalForecast }}</p>
    </div>

    <ul v-else>
      <li v-for="city in cities" :key="city.name">
        {{ city.skyIcon }} {{ city.name }}: {{ city.skyDescription }} ({{ city.minTemp }}°C -
        {{ city.maxTemp }}°C)
      </li>
    </ul>
  </div>
</template>
